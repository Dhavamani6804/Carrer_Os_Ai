import { CheckCircle2 } from "lucide-react";

const steps = [
  "Reading Job Description...",
  "Extracting Company...",
  "Finding Required Skills...",
  "Analyzing Responsibilities...",
  "Understanding Experience...",
  "Preparing AI Suggestions...",
];

function AIProgress() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <h2 className="text-xl font-bold mb-8">
        AI Analysis in Progress
      </h2>

      <div className="space-y-5">

        {steps.map((step) => (

          <div
            key={step}
            className="flex items-center gap-3 animate-pulse"
          >

            <CheckCircle2
              size={20}
              className="text-blue-600"
            />

            <span>{step}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIProgress;