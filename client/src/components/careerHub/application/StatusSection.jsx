import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { APPLICATION_STATUSES } from "../../../constants/applicationStatuses";
import { updateApplicationStatus } from "../../../services/careerHubService";

function StatusSection({ applicationId, currentStatus, onUpdated }) {
  const [status, setStatus] = useState(currentStatus || "WISHLIST");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(currentStatus || "WISHLIST");
  }, [currentStatus]);

  async function handleUpdate() {
    try {
      setLoading(true);

      await updateApplicationStatus(applicationId, {
        status,
        note,
      });

      toast.success("Application status updated.");

      setNote("");

      if (onUpdated) {
        onUpdated();
      }
    } catch (error) {
      console.error(error);

      console.log(error.response);

      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Unable to update status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Update Status</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Current Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-3"
          >
            {APPLICATION_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Timeline Note
          </label>

          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: Cleared OA, waiting for Interview Round 1..."
            className="w-full rounded-xl border border-slate-300 p-3 resize-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
}

export default StatusSection;
