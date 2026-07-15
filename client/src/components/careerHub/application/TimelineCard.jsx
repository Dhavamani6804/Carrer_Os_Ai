import { Plus } from "lucide-react";

function TimelineCard({ onAdd }) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track every important event in your hiring journey.
        </p>
      </div>

      {/* <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Event
      </button> */}

    </div>
  );
}

export default TimelineCard;