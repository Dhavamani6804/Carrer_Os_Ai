import useMentorChat from "../../hooks/useMentorChat";
import MentorInput from "./MentorInput";
import MentorMessage from "./MentorMessage";
import MentorTyping from "./MentorTyping";

function MentorChat({ sessionId }) {

    const {

        messages,

        loading,

        ask

    } = useMentorChat(sessionId);

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-bold">

                AI Mentor Chat

            </h2>

            <p className="mt-2 text-slate-500">

                Ask interview questions, coding doubts, company-specific preparation and more.

            </p>

            <div className="mt-6 h-[450px] space-y-4 overflow-y-auto rounded-2xl bg-slate-50 p-4">

                {messages.length === 0 && (

                    <div className="text-center text-slate-400 mt-32">

                        👋 Hi!

                        <br />

                        Ask me anything about your interview.

                    </div>

                )}

                {messages.map((message, index) => (

                    <MentorMessage

                        key={index}

                        sender={message.sender}

                        message={message.message}

                    />

                ))}

                {loading && <MentorTyping />}

            </div>

            <MentorInput

                onSend={ask}

                loading={loading}

            />

        </div>

    );

}

export default MentorChat;