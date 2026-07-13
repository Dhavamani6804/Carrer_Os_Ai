
import { LoaderCircle, Save } from "lucide-react";

function SaveApplicationButton({
  loading,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-8 py-3 flex items-center gap-2 disabled:bg-green-400"
    >
      {loading ? (
        <>
          <LoaderCircle
            className="animate-spin"
            size={18}
          />

          Saving...
        </>
      ) : (
        <>
          <Save size={18} />

          Save Application
        </>
      )}
    </button>
  );
}

export default SaveApplicationButton;