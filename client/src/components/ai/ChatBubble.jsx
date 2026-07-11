import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";

function ChatBubble({ message }) {
  const isUser = message.role === "user";

  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
          <Bot size={20} />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`
          relative
          max-w-4xl
          rounded-2xl
          shadow-sm
          px-6
          py-4

          ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200"
          }
        `}
      >
        {/* Copy Button */}

        {!isUser && (
          <button
            onClick={copyMessage}
            className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 transition"
          >
            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}
          </button>
        )}

        {/* User */}

        {isUser ? (
          <p className="whitespace-pre-wrap leading-7">
            {message?.content}
          </p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );

                  if (match) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "12px",
                          padding: "16px",
                          marginTop: "16px",
                          marginBottom: "16px",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  }

                  return (
                    <code
                      className="bg-gray-100 rounded px-1.5 py-0.5 text-red-600"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message?.content || ""}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}

        {message.time && (
          <p
            className={`text-xs mt-4 ${
              isUser
                ? "text-blue-100"
                : "text-gray-400"
            }`}
          >
            {new Date(message.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center flex-shrink-0">
          <User size={20} />
        </div>
      )}
    </div>
  );
}

export default ChatBubble;