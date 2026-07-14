function SettingsCard({
  title,

  description,

  children,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-slate-500">
          {description}
        </p>
      )}

      <div className="mt-8 space-y-6">
        {children}
      </div>
    </div>
  );
}

export default SettingsCard;