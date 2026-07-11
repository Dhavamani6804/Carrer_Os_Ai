import { Bot } from "lucide-react";

function TypingIndicator() {
  return (
    <div className="flex gap-4 mt-6">

      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
        <Bot size={20} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>

        </div>

        <p className="text-gray-500 text-sm mt-2">
          CareerOS AI is thinking...
        </p>

      </div>

    </div>
  );
}

export default TypingIndicator;