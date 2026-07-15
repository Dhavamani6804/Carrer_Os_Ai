import { useEffect, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ChatHeader from "../../components/ai/ChatHeader";
import WelcomeCards from "../../components/ai/WelcomeCards";
import ChatBubble from "../../components/ai/ChatBubble";
import ChatInput from "../../components/ai/ChatInput";
import TypingIndicator from "../../components/ai/TypingIndicator";
import useGeneralMentor from "../../hooks/useGeneralMentor";

function AIMentorPage() {

  const {

    session,

    messages,

    loading,

    selectCategory,

    sendMessage,

    newChat

  } = useGeneralMentor();

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages, loading]);

  return (

    <DashboardLayout>

      <div className="p-8">

        <ChatHeader

          category={session?.category}

          onNewChat={newChat}

        />

        {!session && (

          <div className="max-w-5xl mx-auto">

            <WelcomeCards

              onSelect={selectCategory}

            />

          </div>

        )}

        {session && (

          <>

            <div className="mt-10 max-w-5xl mx-auto space-y-6">

              {messages.map((message, index) => (

                <ChatBubble

                  key={index}

                  message={message}

                />

              ))}

              {loading && <TypingIndicator />}

              <div ref={bottomRef} />

            </div>

            <div className="max-w-5xl mx-auto">

              <ChatInput

                loading={loading}

                onSend={sendMessage}

              />

            </div>

          </>

        )}

      </div>

    </DashboardLayout>

  );

}

export default AIMentorPage;