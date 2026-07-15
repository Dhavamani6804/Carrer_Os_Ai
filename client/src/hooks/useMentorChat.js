import { useEffect, useState } from "react";
import {
  sendMessage,
  getMessages,
} from "../services/mentorChatService";

function useMentorChat(sessionId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    async function loadMessages() {
      try {
        const data = await getMessages(sessionId);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMessages();
  }, [sessionId]);

  async function ask(question) {
    if (!question.trim() || loading) return;

    const userMessage = {
      sender: "USER",
      message: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await sendMessage(sessionId, question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          message: response.answer,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    ask,
  };
}

export default useMentorChat;