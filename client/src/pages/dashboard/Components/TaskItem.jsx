import { Check, Trash2 } from "lucide-react";

function TaskItem({

    task,

    onToggle,

    onDelete

}) {

    return (

        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 transition">

            <div className="flex items-center gap-3">

                <button
                    onClick={() => onToggle(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                        ${
                            task.completed
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-slate-400"
                        }`}
                >

                    {task.completed && (

                        <Check size={14} />

                    )}

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

                className="text-red-500 hover:text-red-700 transition"

            >

                <Trash2 size={18} />

            </button>

        </div>

    );

}

export default TaskItem;