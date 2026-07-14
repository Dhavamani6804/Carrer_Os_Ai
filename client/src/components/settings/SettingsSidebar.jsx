const sections = [
  "Account",

  "Career",

  "AI",

  "Notifications",

  "Appearance",

  "Security",

  "Privacy",

  "Danger",
];

function SettingsSidebar({ selected, onSelect }) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSelect(section)}
            className={`w-full rounded-xl px-4 py-3 text-left transition

${selected === section ? "bg-blue-600 text-white" : "hover:bg-slate-100"}`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SettingsSidebar;
