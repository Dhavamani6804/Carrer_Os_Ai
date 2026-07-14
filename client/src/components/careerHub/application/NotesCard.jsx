import NotesEditor from "./NotesEditor";

function NotesCard({
  applicationId,
  notes,
  onUpdated,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Personal Notes
      </h2>

      <p className="mt-2 mb-6 text-sm text-slate-500">
        Keep recruiter conversations, interview feedback,
        salary discussions and follow-up reminders.
      </p>

      <NotesEditor
        applicationId={applicationId}
        initialNotes={notes}
        onUpdated={onUpdated}
      />

    </div>
  );
}

export default NotesCard;