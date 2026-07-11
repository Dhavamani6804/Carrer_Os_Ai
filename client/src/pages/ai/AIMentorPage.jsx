import DashboardLayout from "../../layouts/DashboardLayout";
import { askAI } from "../../services/aiService";
import toast from "react-hot-toast";
import ChatHeader from "../../components/ai/ChatHeader";
import WelcomeCards from "../../components/ai/WelcomeCards";
import ChatBubble from "../../components/ai/ChatBubble";
import ChatInput from "../../components/ai/ChatInput";
import TypingIndicator from "../../components/ai/TypingIndicator";
import { useEffect, useRef, useState } from "react";

function AIMentorPage() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(question) {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await askAI(question);

      const aiMessage = {
        role: "assistant",
        content: response.answer,
        time: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Unable to contact AI Mentor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <ChatHeader
          onNewChat={() => {
            setMessages([]);
          }}
        />
        {messages.length === 0 && (
          <div className="max-w-5xl mx-auto">
            <WelcomeCards onSelect={handleSend} />
          </div>
        )}
        <div className="mt-10 max-w-5xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
          {loading && <TypingIndicator />}
        </div>
        <div ref={bottomRef} />
        <div className="max-w-5xl mx-auto">
          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIMentorPage;
