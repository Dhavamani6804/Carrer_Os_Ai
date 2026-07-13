import { useState } from "react";
import { sendMessage } from "../services/mentorChatService";

function useMentorChat(sessionId) {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    async function ask(question) {

        if (!question.trim()) return;

        const userMessage = {

            sender: "USER",

            message: question

        };

        setMessages(prev => [

            ...prev,

            userMessage

        ]);

        setLoading(true);

        try {

            const response = await sendMessage(
                sessionId,
                question
            );

            setMessages(prev => [

                ...prev,

                {

                    sender: "AI",

                    message: response.answer

                }

            ]);

        } finally {

            setLoading(false);

        }

    }

    return {

        messages,

        loading,

        ask

    };

}

export default useMentorChat;