const sections = [
  "Account",
  "Security",
  "Appearance",
  "Danger",
];

function SettingsSidebar({ selected, onSelect }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        Settings
      </h2>

      <div className="space-y-2">

        {sections.map((section) => (

          <button
            key={section}
            onClick={() => onSelect(section)}
            className={`w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-200
              ${
                selected === section
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            {section === "Danger" ? "Danger Zone" : section}
          </button>

        ))}

      </div>

    </div>
  );
}

export default SettingsSidebar;