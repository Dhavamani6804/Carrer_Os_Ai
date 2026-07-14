function SettingRow({
  label,

  description,

  children,
}) {
  return (
    <div className="flex items-center justify-between gap-8 border-b pb-5">
      <div>
        <h4 className="font-medium">
          {label}
        </h4>

        {description && (
          <p className="text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

export default SettingRow;