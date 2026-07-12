import SkillBadge from "./SkillBadge";

function JobList({ jobs = [], selectedJobId, onSelect }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <button
          key={job.id}
          type="button"
          onClick={() => onSelect?.(job)}
          className={`w-full rounded-3xl border p-5 text-left transition ${
            selectedJobId === job.id
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-slate-500">{job.company}</p>
              <p className="mt-2 text-sm text-slate-500">{job.location}</p>
            </div>
            <span className="text-sm font-medium text-slate-700">{job.salary}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(job.skills || []).slice(0, 4).map((skill) => (
              <SkillBadge key={skill} label={skill} />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

export default JobList;
