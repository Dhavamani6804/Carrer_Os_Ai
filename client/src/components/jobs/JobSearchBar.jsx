function JobSearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row"
    >
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Search by title, company, or skill"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  );
}

export default JobSearchBar;
