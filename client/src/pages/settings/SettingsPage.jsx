import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import useSettings from "../../hooks/useSettings";
import SettingsHeader from "../../components/settings/SettingsHeader";
import SettingsSidebar from "../../components/settings/SettingsSidebar";
import AccountSettings from "../../components/settings/sections/AccountSettings";
import AppearanceSettings from "../../components/settings/sections/AppearanceSettings";
import SecuritySettings from "../../components/settings/sections/SecuritySettings";
import DangerZone from "../../components/settings/sections/DangerZone";

function SettingsPage() {
  const {
    settings,

    setSettings,

    loading,

    saveSettings,

    saving,
  } = useSettings();

  const [selected, setSelected] = useState("Account");

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">Loading Settings...</div>
      </DashboardLayout>
    );
  }

  function renderSection() {
    switch (selected) {

  case "Account":
    return (
      <AccountSettings
        settings={settings}
        setSettings={setSettings}
      />
    );

  case "Appearance":
    return (
      <AppearanceSettings
        settings={settings}
        setSettings={setSettings}
      />
    );

  case "Security":
    return <SecuritySettings />;

  case "Danger":
    return <DangerZone />;

  default:
    return null;
}
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <SettingsHeader />

        <div className="grid grid-cols-[260px_1fr] gap-8">
          <SettingsSidebar selected={selected} onSelect={setSelected} />

          <div className="space-y-6">
            {renderSection()}

            <div className="flex justify-end">
              <button
                onClick={() => saveSettings(settings)}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;
