import TimelineForm from "./TimelineForm";

function TimelineModal({
  open,
  title,
  initialData,
  loading,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-black"
          >
            ×
          </button>

        </div>

        <div className="mt-6">

          <TimelineForm
            initialData={initialData}
            loading={loading}
            onSubmit={onSubmit}
          />

        </div>

      </div>

    </div>
  );
}

export default TimelineModal;