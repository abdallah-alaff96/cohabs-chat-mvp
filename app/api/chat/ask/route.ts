import type { Message } from "@/lib/store";
import { NextResponse } from "next/server";
import { appendMessage, createConversation } from "@/lib/store";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

type AskBody = {
  message: string;
  conversationId?: string;
};

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

  return NextResponse.json({
    conversationId: convId,
  });
}
