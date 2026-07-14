import { useState } from "react";
import { APPLICATION_STATUSES } from "../../../constants/applicationStatuses";

function TimelineForm({
  initialData = {},
  onSubmit,
  loading,
}) {
  const [status, setStatus] = useState(
    initialData.status || "APPLIED"
  );

  const [title, setTitle] = useState(
    initialData.title || ""
  );

  const [note, setNote] = useState(
    initialData.note || ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      status,
      title,
      note,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>

        <label className="font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="mt-2 w-full rounded-xl border p-3"
        >
          {APPLICATION_STATUSES.map(item=>(
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

      </div>

      <div>

        <label className="font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Interview Scheduled"
          className="mt-2 w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="font-medium">
          Note
        </label>

        <textarea
          rows={5}
          value={note}
          onChange={(e)=>setNote(e.target.value)}
          placeholder="Recruiter informed interview will happen next Monday..."
          className="mt-2 w-full rounded-xl border p-3 resize-none"
        />

      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Event"}
      </button>

    </form>
  );
}

export default TimelineForm;