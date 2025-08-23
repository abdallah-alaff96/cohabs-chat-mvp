import type { Message } from "@/lib/store";
import { NextResponse } from "next/server";
import { appendMessage, createConversation } from "@/lib/store";
import { randomUUID } from "crypto";
import { matchRule } from "@/lib/rules";

export const dynamic = "force-dynamic";

type AskBody = {
  message: string;
  conversationId?: string;
};

function endWithSignature(text: string) {
  const suffix = " Anything else I can help with?";
  return text.endsWith("Anything else I can help with?") ? text : text + suffix;
}

export async function POST(req: Request) {
  const { message, conversationId }: AskBody = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  // Conversation handling (in-memory)
  let convId = conversationId;
  if (!convId) {
    convId = randomUUID();
    createConversation(convId);
  }

  const userMsg: Message = {
    role: "user",
    content: message,
    timestamp: Date.now(),
  };
  appendMessage(convId, userMsg);

  // Rules first
  const rule = matchRule(message);
  let reply: string;
  let answered = false;

  if (rule) {
    answered = true;
    reply = endWithSignature(rule.reply);
  } else {
    // Fallback
    answered = false;
    reply = endWithSignature(
      "I couldn’t find an answer to that right now. I’ve notified a teammate to help you directly."
    );

    // Call mocked Slack endpoint (server-to-server)
    try {
      const host = (
        req.headers.get("x-forwarded-host") ||
        req.headers.get("host") ||
        ""
      ).toString();
      const proto = (req.headers.get("x-forwarded-proto") || "http").toString();
      const base = host ? `${proto}://${host}` : "";
      const payload = {
        question: message,
        conversationId: convId,
        source: "chat-mvp",
      };

      if (base) {
        await fetch(`${base}/api/notify-slack`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Fallback: still log locally if base URL isn't available
        console.log("[MOCK SLACK NOTIFY - LOCAL]", payload);
      }
    } catch (err) {
      console.warn("Notify Slack (mock) failed:", err);
    }
  }

  const assistantMsg: Message = {
    role: "assistant",
    content: reply,
    timestamp: Date.now(),
    answered,
  };
  appendMessage(convId, assistantMsg);

  return NextResponse.json({
    conversationId: convId,
    reply,
    answered,
  });
}
