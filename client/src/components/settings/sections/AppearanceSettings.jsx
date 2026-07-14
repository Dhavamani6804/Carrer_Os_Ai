import SettingsCard from "../common/SettingsCard";

function AppearanceSettings({
  settings,
  setSettings,
}) {
  return (
    <SettingsCard
      title="Appearance"
      description="Customize the look and feel of CareerOS."
    >
      <div>
        <label className="font-medium">
          Theme
        </label>

        <select
          className="mt-2 w-full rounded-xl border p-3"
          value={settings.theme}
          onChange={(e) =>
            setSettings({
              ...settings,
              theme: e.target.value,
            })
          }
        >
          <option value="LIGHT">
            Light
          </option>

          <option value="DARK">
            Dark
          </option>

          <option value="SYSTEM">
            System
          </option>
        </select>

        <p className="mt-2 text-sm text-slate-500">
          Dark mode support will automatically apply once enabled across the application.
        </p>
      </div>
    </SettingsCard>
  );
}

export default AppearanceSettings;