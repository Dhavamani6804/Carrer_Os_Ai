import { useState } from "react";
import { SendHorizonal } from "lucide-react";

function MentorInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about this interview..."
        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
      />

      <button
        type="submit"
        disabled={loading || !message.trim()}
        className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : <SendHorizonal size={18} />}{" "}
      </button>
    </form>
  );
}

export default MentorInput;
