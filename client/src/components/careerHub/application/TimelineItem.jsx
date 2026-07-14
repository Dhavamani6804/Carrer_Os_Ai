import { Pencil, Trash2 } from "lucide-react";
import { APPLICATION_STATUSES } from "../../../constants/applicationStatuses";

function TimelineItem({
  item,
  onEdit,
  onDelete,
}) {
  if (!item) return null;

  const currentStatus = APPLICATION_STATUSES.find(
    (status) => status.value === item.status
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <h3 className="font-semibold text-slate-900">
            {item.title || currentStatus?.label || item.status}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {item.timestamp
              ? new Date(item.timestamp).toLocaleString()
              : ""}
          </p>

          {item.note && (
            <p className="mt-3 text-slate-700">
              {item.note}
            </p>
          )}

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit?.(item)}
            className="rounded-lg border p-2 hover:bg-slate-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete?.(item)}
            className="rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default TimelineItem;