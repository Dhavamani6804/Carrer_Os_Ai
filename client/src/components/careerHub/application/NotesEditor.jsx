import { useState } from "react";
import toast from "react-hot-toast";
import { updateNotes } from "../../../services/careerHubService";

function NotesEditor({
  applicationId,
  initialNotes,
  onUpdated,
}) {
  const [notes, setNotes] = useState(initialNotes || "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);

      await updateNotes(applicationId, notes);

      toast.success("Notes updated successfully.");

      if (onUpdated) {
        onUpdated();
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to update notes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">

      <textarea
        rows={10}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write interview notes, recruiter feedback, salary discussions, follow-up reminders..."
        className="w-full rounded-2xl border border-slate-300 p-4 resize-none focus:border-blue-500 focus:outline-none"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Notes"}
      </button>

    </div>
  );
}

export default NotesEditor;