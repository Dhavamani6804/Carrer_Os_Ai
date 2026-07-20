import Card from "../../../components/ui/Card";

function ProgressCircle({
  progress,

  completed,

  total,
}) {
  const radius = 55;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="140" height="140" className="-rotate-90">
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#2563eb"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: "all .4s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">{progress}%</h2>

            <p className="text-xs text-gray-500">Complete</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-semibold text-lg">Today's Progress</p>

          <p className="text-gray-500 text-sm mt-2">
            {completed} of {total} task{total !== 1 ? "s" : ""} completed
          </p>

          {total === 0 && (
            <p className="mt-3 text-xs text-slate-400">
              Add a task to start tracking your progress.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProgressCircle;
