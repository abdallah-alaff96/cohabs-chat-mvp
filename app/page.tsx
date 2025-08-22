"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { MessageBubble } from "./components/MessageBubble";

type Msg = { role: "user" | "assistant"; content: string };

export default function Page() {
  // TODO: seMessages to send messages to the backend and get responses
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I am the Cohabs assistant. Ask me about payments, bookings, maintenance, house rules, locations, or community.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
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
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Input
            placeholder="Type your question…"
            value={input}
            onChange={handleInputChange}
          />
          <Button>Send</Button>
        </div>

        <p className="text-xs text-gray-500">
          Tip: Try asking about payments, bookings, or maintenance.
        </p>
      </div>
    </main>
  );
}
