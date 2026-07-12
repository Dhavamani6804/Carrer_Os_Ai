import JobCard from "./JobCard";

function JobDetails({ job }) {
  if (!job) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">
        Select a job to view more details.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <JobCard job={job} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h4 className="text-lg font-semibold">Description</h4>
        <p className="mt-2 text-slate-600">{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
