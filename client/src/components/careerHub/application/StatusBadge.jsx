import { APPLICATION_STATUSES } from "../../../constants/applicationStatuses";

function StatusBadge({ status }) {

  const current =
    APPLICATION_STATUSES.find(
      (item) => item.value === status
    ) || APPLICATION_STATUSES[0];

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${current.color}`}
    >
      {current.label}
    </span>
  );
}

export default StatusBadge;