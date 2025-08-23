"use client";

import type { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { MessageBubble } from "./components/MessageBubble";

type Msg = { role: "user" | "assistant"; content: string };

export default function Page() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I am the Cohabs assistant. Ask me about payments, bookings, maintenance, house rules, locations, or community.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    undefined
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId }),
      });
      const data = await res.json();
      if (data?.conversationId && data?.conversationId !== conversationId) {
        setConversationId(data.conversationId);
      }
      if (data?.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry—something went wrong. Please try again. Anything else I can help with?",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Network error—please try again in a moment. Anything else I can help with?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="card p-4 md:p-6">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="max-h-[60vh] min-h-[40vh] overflow-y-auto pr-1">
          <div className="flex flex-col gap-3 md:gap-4">
            {messages.map((msg, index) => (
              <MessageBubble key={index} role={msg.role}>
                {msg.content}
              </MessageBubble>
            ))}
            {loading && (
              <MessageBubble role="assistant">Thinking…</MessageBubble>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Input
            placeholder="Type your question…"
            value={input}
            onChange={handleInputChange}
            disabled={loading}
            onKeyDown={onKeyDown}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Tip: Try asking about payments, bookings, or maintenance.
        </p>
      </div>
    </main>
  );
}
