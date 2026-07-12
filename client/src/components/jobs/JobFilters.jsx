function JobFilters({ value, onChange }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <input
        value={value.location}
        onChange={(e) => onChange?.({ ...value, location: e.target.value })}
        placeholder="Location"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
      <input
        value={value.employmentType}
        onChange={(e) => onChange?.({ ...value, employmentType: e.target.value })}
        placeholder="Employment type"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
      <input
        value={value.experienceLevel}
        onChange={(e) => onChange?.({ ...value, experienceLevel: e.target.value })}
        placeholder="Experience level"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default JobFilters;
