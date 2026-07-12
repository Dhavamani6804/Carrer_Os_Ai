function EmptyJobs({
  title = "No jobs found",
  description = "Try adjusting your search or filters.",
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyJobs;
