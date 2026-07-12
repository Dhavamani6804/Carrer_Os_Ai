import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getJobs, getJobById } from "../../services/jobService";
import JobSearchBar from "../../components/jobs/JobSearchBar";
import JobFilters from "../../components/jobs/JobFilters";
import JobList from "../../components/jobs/JobList";
import JobDetails from "../../components/jobs/JobDetails";
import EmptyJobs from "../../components/jobs/EmptyJobs";
import LoadingJobs from "../../components/jobs/LoadingJobs";
import useDebounce from "../../hooks/useDebounce";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
  keyword: "",
  location: "",
  employmentType: "",
  experienceLevel: "",
});
const debouncedKeyword = useDebounce(filters.keyword, 500);

useEffect(() => {
  loadJobs();
}, [
  debouncedKeyword,
  filters.location,
  filters.employmentType,
  filters.experienceLevel,
]);

  async function loadJobs() {
    setLoading(true);
    setError("");

    try {
      const data = await getJobs({
  ...filters,
  keyword: debouncedKeyword,
});
      setJobs(data || []);

      if (!selectedJob && data?.length) {
        const firstJob = await getJobById(data[0].id);
        setSelectedJob(firstJob);
      }
    } catch (err) {
      setError("Unable to load jobs right now.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  const hasJobs = useMemo(() => jobs.length > 0, [jobs]);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">Jobs</h1>
          <p className="text-slate-500 mt-2">
            Search and explore opportunities tailored to your profile.
          </p>
        </div>

        <JobSearchBar
          value={filters.keyword}
          onChange={(keyword) => setFilters((prev) => ({ ...prev, keyword }))}
          onSubmit={loadJobs}
        />

        <JobFilters
          value={filters}
          onChange={(nextFilters) => setFilters(nextFilters)}
        />

        {loading ? (
          <LoadingJobs />
        ) : error ? (
          <EmptyJobs title="Unable to load jobs" description={error} />
        ) : hasJobs ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <JobList
              jobs={jobs}
              selectedJobId={selectedJob?.id}
              onSelect={async (job) => {
                setSelectedJob(await getJobById(job.id));
              }}
            />
            <JobDetails job={selectedJob} />
          </div>
        ) : (
          <EmptyJobs />
        )}
      </div>
    </DashboardLayout>
  );
}

export default JobsPage;
