import { Bot, Plus } from "lucide-react";

function ChatHeader({ onNewChat }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Bot size={28} />
        </div>

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-3xl font-bold text-gray-800">
              CareerOS AI Mentor
            </h1>

            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Powered by Gemini
            </span>

          </div>

          <p className="text-gray-500 mt-1">
            Your personal software engineering career mentor.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <button
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition-all duration-200 shadow"
      >
        <Plus size={18} />
        New Chat
      </button>

    </div>
  );
}

export default ChatHeader;