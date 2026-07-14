import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

function useSettings() {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load settings.");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(updated) {
    try {
      setSaving(true);

      const response = await updateSettings(updated);

      setSettings(response);

      toast.success("Settings updated.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,

    setSettings,

    loading,

    saving,

    saveSettings,

    refresh: loadSettings,
  };
}

export default useSettings;