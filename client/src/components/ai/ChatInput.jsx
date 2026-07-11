import { useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";

function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const textareaRef = useRef(null);

  function handleChange(e) {
    setQuestion(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }

  function handleSend() {
    if (!question.trim()) return;

    onSend(question);

    setQuestion("");

    textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  }

  return (
    <div className="sticky bottom-0 mt-8 bg-white border border-gray-200 rounded-3xl shadow-lg p-4">

      <div className="flex items-end gap-4">

        <textarea
          ref={textareaRef}
          rows={1}
          value={question}
          disabled={loading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Java, Spring Boot, React, DSA..."
          className="
            flex-1
            resize-none
            outline-none
            max-h-52
            overflow-y-auto
            text-gray-700
            placeholder:text-gray-400
          "
        />

        <button
          disabled={loading || !question.trim()}
          onClick={handleSend}
          className={`
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            transition

            ${
              loading || !question.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          <SendHorizonal size={20} />
        </button>

      </div>

    </div>
  );
}

export default ChatInput;