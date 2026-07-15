import SettingsCard from "../common/SettingsCard";
import { useTheme } from "../../../context/ThemeContext";

function AppearanceSettings({
  settings,
  setSettings,
}) {

  const { setTheme } = useTheme();

  function handleChange(e) {

    const value = e.target.value;

    setSettings({
      ...settings,
      theme: value,
    });

    switch (value) {

      case "DARK":
        setTheme("dark");
        break;

      case "LIGHT":
        setTheme("light");
        break;

      default: {

        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        setTheme(
          prefersDark
            ? "dark"
            : "light"
        );

      }

    }

  }

  return (

    <SettingsCard
      title="Appearance"
      description="Customize CareerOS appearance."
    >

      <label className="font-medium">

        Theme

      </label>

      <select
        value={settings.theme}
        onChange={handleChange}
        className="mt-2 w-full rounded-xl border p-3"
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

    </SettingsCard>

  );

}

export default AppearanceSettings;