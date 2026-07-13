import { APPLICATION_STATUSES } from "../../../constants/applicationStatuses";

function TimelineItem({ item }) {

  const currentStatus =
    APPLICATION_STATUSES.find(
      (status) => status.value === item.status
    );

  return (
    <div className="relative pl-8">

      <span
        className="absolute left-0 top-2 h-3 w-3 rounded-full bg-blue-600"
      />

      <h4 className="font-semibold text-slate-900">
        {currentStatus?.label || item.status}
      </h4>

      <p className="text-sm text-slate-500">
        {item.timestamp
          ? new Date(item.timestamp).toLocaleString()
          : ""}
      </p>

      {item.note && (
        <p className="mt-2 text-sm text-slate-700">
          {item.note}
        </p>
      )}

    </div>
  );
}

export default TimelineItem;