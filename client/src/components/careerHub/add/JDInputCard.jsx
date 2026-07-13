
import { Sparkles } from "lucide-react";
import AnalyzeButton from "./AnalyzeButton";

function JDInputCard({
  form,
  setForm,
  loading,
  onAnalyze,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Add New Application
        </h2>

        <p className="text-slate-500 mt-2">
          Paste the Job Description and let AI extract everything automatically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="text-sm font-semibold">
            Job Role
          </label>

          <input
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            placeholder="Java Backend Developer"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Job Source
          </label>

          <select
            value={form.source}
            onChange={(e) =>
              setForm({
                ...form,
                source: e.target.value,
              })
            }
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="LINKEDIN">LinkedIn</option>
            <option value="NAUKRI">Naukri</option>
            <option value="INDEED">Indeed</option>
            <option value="FOUNDIT">Foundit</option>
            <option value="CAREERS_PAGE">Company Career Page</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

      </div>

      <div className="mt-6">

        <label className="text-sm font-semibold">
          Job URL (Optional)
        </label>

        <input
          value={form.jobUrl}
          onChange={(e) =>
            setForm({
              ...form,
              jobUrl: e.target.value,
            })
          }
          placeholder="https://..."
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="mt-6">

        <div className="flex justify-between">

          <label className="text-sm font-semibold">
            Job Description
          </label>

          <span className="text-xs text-slate-400">
            {form.jobDescription.length}/10000
          </span>

        </div>

        <textarea
          rows={15}
          value={form.jobDescription}
          onChange={(e) =>
            setForm({
              ...form,
              jobDescription: e.target.value,
            })
          }
          placeholder="Paste the complete Job Description..."
          className="mt-2 w-full rounded-2xl border border-slate-300 p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="mt-8 flex justify-end">

        <AnalyzeButton
          loading={loading}
          onClick={onAnalyze}
        />

      </div>

    </div>
  );
}

export default JDInputCard;