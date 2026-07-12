function LoadingJobs() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-64 rounded bg-slate-100" />
          <div className="mt-6 h-4 w-full rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default LoadingJobs;
