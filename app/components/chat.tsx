import React, { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send the message to a backend
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Chat Messages Area - Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center text-base-content/60">
        <svg
          /* Placeholder icon */ className="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Chat</h2>
        <p>Add a source to get started</p>
      </div>

      {/* Chat Input Area - Interactive */}
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 bg-base-200 rounded-l-md placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary border-base-300 border"
          />
          <button
            type="submit"
            className="btn btn-primary rounded-l-none h-auto min-h-0 px-4 flex items-center"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
