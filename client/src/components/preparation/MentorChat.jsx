import { useEffect, useRef } from "react";
import useMentorChat from "../../hooks/useMentorChat";
import MentorInput from "./MentorInput";
import MentorMessage from "./MentorMessage";
import MentorTyping from "./MentorTyping";

function MentorChat({ sessionId }) {
  const { messages, loading, ask } = useMentorChat(sessionId);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">AI Mentor Chat</h2>

      <p className="mt-2 text-slate-500">
        Ask interview questions, coding doubts, company-specific preparation and
        more.
      </p>

      <div className="mt-6 h-[450px] overflow-y-auto rounded-2xl bg-slate-50 p-4">
        {messages.length === 0 && (
          <div className="mt-32 text-center text-slate-400">
            👋 Hi!
            <br />
            Ask me anything about your interview.
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message, index) => (
            <MentorMessage
              key={`${message.timestamp ?? index}-${message.sender}`}
              sender={message.sender}
              message={message.message}
            />
          ))}

          {loading && <MentorTyping />}

          <div ref={bottomRef} />
        </div>
      </div>

      <MentorInput onSend={ask} loading={loading} />
    </div>
  );
}

export default MentorChat;
