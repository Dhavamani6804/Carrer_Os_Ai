import { Check, Trash2, ArrowRightCircle, AlertTriangle } from "lucide-react";

function TaskItem({
  task,

  onToggle,

  onDelete,

  onMove,

  actionTaskId,

  actionType,
}) {
  const busy = actionTaskId === task.id;

  if (task.overdue) {
    return (
      <div className="border border-amber-300 bg-amber-50 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={18} />

              <span className="font-semibold">Overdue Task</span>
            </div>

            <p className="mt-2 text-slate-700">{task.title}</p>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            disabled={busy}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <button
          onClick={() => onMove(task.id)}
          disabled={busy}
          className="mt-4 flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition"
        >
          <ArrowRightCircle size={18} />

          {busy && actionType === "move"
            ? "Moving..."
            : "Move To Today's Tasks"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          disabled={busy}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                    ${
                      task.completed
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-400"
                    }`}
        >
          {task.completed && <Check size={14} />}
        </button>

        <span
          className={`text-sm md:text-base
                    ${
                      task.completed
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        disabled={busy}
        className="text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default TaskItem;
