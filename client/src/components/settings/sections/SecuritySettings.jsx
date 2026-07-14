import { useState } from "react";
import toast from "react-hot-toast";

import SettingsCard from "../common/SettingsCard";
import { changePassword } from "../../../services/settingsService";

function SecuritySettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Unable to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsCard
      title="Security"
      description="Change your account password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="password"
          placeholder="Current Password"
          className="w-full rounded-xl border p-3"
          value={form.currentPassword}
          onChange={(e) =>
            setForm({
              ...form,
              currentPassword: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full rounded-xl border p-3"
          value={form.newPassword}
          onChange={(e) =>
            setForm({
              ...form,
              newPassword: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-xl border p-3"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          {loading
            ? "Updating..."
            : "Change Password"}
        </button>
      </form>
    </SettingsCard>
  );
}

export default SecuritySettings;