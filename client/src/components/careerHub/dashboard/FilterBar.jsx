function FilterBar({ filters, onChange }) {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <input
        value={filters.status}
        onChange={(e) => onChange?.({ ...filters, status: e.target.value })}
        placeholder="Status"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
      <input
        value={filters.source}
        onChange={(e) => onChange?.({ ...filters, source: e.target.value })}
        placeholder="Source"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
      <input
        value={filters.workMode}
        onChange={(e) => onChange?.({ ...filters, workMode: e.target.value })}
        placeholder="Work mode"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default FilterBar;
