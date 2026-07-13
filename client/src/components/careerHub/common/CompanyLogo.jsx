function CompanyLogo({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name} logo` : "Company logo"}
        className="h-12 w-12 rounded-2xl object-cover border border-slate-200 bg-white"
      />
    );
  }

  const initials = (name || "C")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
      {initials}
    </div>
  );
}

export default CompanyLogo;
