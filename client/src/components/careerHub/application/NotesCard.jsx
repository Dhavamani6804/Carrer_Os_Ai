function NotesCard({ notes }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-slate-950">Notes</h4>
      <p className="mt-3 whitespace-pre-line text-slate-600">
        {notes || "No notes added yet."}
      </p>
    </div>
  );
}

export default NotesCard;
