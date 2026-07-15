import { Bot, BookOpen, RotateCcw } from "lucide-react";

function ChatHeader({
  category,
  onNewChat,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

            <Bot size={28} />

          </div>

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-bold text-slate-800">

                CareerOS AI Mentor

              </h1>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">

                Gemini

              </span>

            </div>

            <p className="mt-2 text-slate-500">

              Learn interview topics with persistent AI mentoring.

            </p>

          </div>

        </div>

        {category && (

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

              <BookOpen size={18} />

              <span className="font-medium">

                {category}

              </span>

            </div>

            <button

              onClick={onNewChat}

              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"

            >

              <RotateCcw size={18} />

              Resume

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ChatHeader;