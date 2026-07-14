import SettingsCard from "../common/SettingsCard";
import SettingRow from "../common/SettingRow";
import ToggleSwitch from "../common/ToggleSwitch";

function NotificationSettings({
  settings,
  setSettings,
}) {
  return (
    <SettingsCard
      title="Notifications"
      description="Choose which notifications CareerOS should send."
    >
      <SettingRow
        label="Email Notifications"
        description="Receive important updates via email."
      >
        <ToggleSwitch
          checked={settings.emailNotifications}
          onChange={(value) =>
            setSettings({
              ...settings,
              emailNotifications: value,
            })
          }
        />
      </SettingRow>

      <SettingRow
        label="Interview Reminders"
        description="Get reminders before scheduled interviews."
      >
        <ToggleSwitch
          checked={settings.interviewReminders}
          onChange={(value) =>
            setSettings({
              ...settings,
              interviewReminders: value,
            })
          }
        />
      </SettingRow>

      <SettingRow
        label="Application Reminders"
        description="Remind me to follow up on job applications."
      >
        <ToggleSwitch
          checked={settings.applicationReminders}
          onChange={(value) =>
            setSettings({
              ...settings,
              applicationReminders: value,
            })
          }
        />
      </SettingRow>

      <SettingRow
        label="Preparation Reminders"
        description="Receive daily preparation reminders."
      >
        <ToggleSwitch
          checked={settings.preparationReminders}
          onChange={(value) =>
            setSettings({
              ...settings,
              preparationReminders: value,
            })
          }
        />
      </SettingRow>

      <SettingRow
        label="Weekly Progress Report"
        description="Receive a weekly summary of your preparation."
      >
        <ToggleSwitch
          checked={settings.weeklyReport}
          onChange={(value) =>
            setSettings({
              ...settings,
              weeklyReport: value,
            })
          }
        />
      </SettingRow>
    </SettingsCard>
  );
}

export default NotificationSettings;