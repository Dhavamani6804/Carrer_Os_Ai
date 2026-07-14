function SettingsSection({
  title,

  children,
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {children}
    </div>
  );
}

export default SettingsSection;