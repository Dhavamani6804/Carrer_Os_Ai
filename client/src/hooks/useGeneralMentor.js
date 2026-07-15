import { useState } from "react";
import {
  askAI,
  getSession,
  startSession,
} from "../services/aiService";

function useGeneralMentor() {

  const [session, setSession] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  async function selectCategory(category) {

    setLoading(true);

    try {

      const data = await startSession(category);

      setSession(data);

      setMessages(
        (data.messages || []).map(message => ({
          role:
            message.sender === "USER"
              ? "user"
              : "assistant",

          content: message.message,

          time: message.timestamp,
        }))
      );

    } finally {

      setLoading(false);

    }

  }

  async function sendMessage(question) {

    if (!session) return;

    const userMessage = {

      role: "user",

      content: question,

      time: new Date()

    };

    setMessages(prev => [

      ...prev,

      userMessage

    ]);

    setLoading(true);

    try {

      const response = await askAI(
        session.id,
        question
      );

      const aiMessage = {

        role: "assistant",

        content: response.answer,

        time: new Date()

      };

      setMessages(prev => [

        ...prev,

        aiMessage

      ]);

      const updatedSession =
        await getSession(session.id);

      setSession(updatedSession);

    } finally {

      setLoading(false);

    }

  }

  function newChat() {

    if (!session) return;

    selectCategory(session.category);

  }

  return {

    session,

    messages,

    loading,

    selectCategory,

    sendMessage,

    newChat

  };

}

export default useGeneralMentor;