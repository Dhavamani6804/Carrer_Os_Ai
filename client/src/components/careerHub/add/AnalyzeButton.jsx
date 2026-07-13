
import { Sparkles, LoaderCircle } from "lucide-react";

function AnalyzeButton({
  loading,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-2xl flex items-center gap-2 transition-all"
    >
      {loading ? (
        <>
          <LoaderCircle
            size={18}
            className="animate-spin"
          />

          Analyzing...
        </>
      ) : (
        <>
          <Sparkles size={18} />

          Analyze with AI
        </>
      )}
    </button>
  );
}

export default AnalyzeButton;