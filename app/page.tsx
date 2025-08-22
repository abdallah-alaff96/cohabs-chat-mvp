"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

export default function Page() {
  const [input, setInput] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <main className="card p-4 md:p-6">
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="max-h-[60vh] min-h-[40vh] overflow-y-auto pr-1">
          {/* TODO: Msgs will be here */}
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
