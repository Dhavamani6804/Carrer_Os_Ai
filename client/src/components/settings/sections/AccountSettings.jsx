import SettingsCard from "../common/SettingsCard";

function AccountSettings({ settings, setSettings }) {
  return (
    <SettingsCard
      title="Account"
      description="Manage your account information."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="font-medium">
            First Name
          </label>

          <input
            className="mt-2 w-full rounded-xl border p-3"
            value={settings.firstName || ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                firstName: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="font-medium">
            Last Name
          </label>

          <input
            className="mt-2 w-full rounded-xl border p-3"
            value={settings.lastName || ""}
            onChange={(e) =>
              setSettings({
                ...settings,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div className="md:col-span-2">

          <label className="font-medium">
            Email
          </label>

          <input
            disabled
            value={settings.email || ""}
            className="mt-2 w-full rounded-xl border bg-slate-100 p-3"
          />

        </div>

      </div>
    </SettingsCard>
  );
}

export default AccountSettings;