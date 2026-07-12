import SkillBadge from "./SkillBadge";

function JobCard({ job }) {
  if (!job) return null;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold">{job.title}</h3>
      <p className="mt-1 text-slate-500">
        {job.company} - {job.location}
      </p>
      <p className="mt-4 text-slate-700">{job.salary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(job.skills || []).map((skill) => (
          <SkillBadge key={skill} label={skill} />
        ))}
      </div>
    </article>
  );
}

export default JobCard;
