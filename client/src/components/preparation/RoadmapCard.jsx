import { CheckCircle2 } from "lucide-react";

function RoadmapCard({
  roadmap = [],
  sessionId,
  onComplete,
  completedSteps = [],
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Preparation Roadmap</h2>

      <div className="mt-6 space-y-4">
        {roadmap.map((step, index) => {
          const done = completedSteps.includes(index);

          return (
            <button
              key={index}
              onClick={() =>
                onComplete({
                  sessionId,
                  category: "ROADMAP",
                  roadmapIndex: index,
                })
              }
              className={`flex w-full items-start gap-4 rounded-xl border p-4 transition
    ${done ? "border-green-500 bg-green-50" : "hover:bg-slate-50"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white
                ${done ? "bg-green-600" : "bg-blue-600"}`}
              >
                {done ? <CheckCircle2 size={18} /> : index + 1}
              </div>

              <p
                className={
                  done ? "font-medium text-green-700" : "text-slate-700"
                }
              >
                {step}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapCard;
