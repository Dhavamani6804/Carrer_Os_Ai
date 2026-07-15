import { CheckCircle2 } from "lucide-react";

function TechnicalTopicsCard({
  topics = [],
  sessionId,
  onComplete,
  completedTopics = [],
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Technical Topics</h2>

      <div className="mt-6 space-y-3">
        {topics.map((topic) => {
          const done = completedTopics.includes(topic);

          return (
            <button
              key={topic}
              onClick={() =>
                onComplete({
                  sessionId,
                  category: "TECHNICAL",
                  topic,
                })
              }
              className={`flex w-full items-center gap-3 rounded-xl border p-3 transition
    ${done ? "border-green-500 bg-green-50" : "hover:bg-blue-50"}`}
            >
              <CheckCircle2
                size={20}
                className={done ? "text-green-600" : "text-slate-400"}
              />

              <span
                className={
                  done ? "font-medium text-green-700" : "text-slate-700"
                }
              >
                {topic}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TechnicalTopicsCard;
