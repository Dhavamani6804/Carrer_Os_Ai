import { useState } from "react";
import SettingsCard from "../common/SettingsCard";
import { deleteAccount } from "../../../services/settingsService";
import toast from "react-hot-toast";

function DangerZone() {

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {

    if (!window.confirm("Delete your account permanently?"))
      return;

    try {

      setLoading(true);

      await deleteAccount({
        password,
      });

      toast.success("Account deleted.");

      localStorage.clear();

      window.location.href = "/login";

    } catch (e) {

      toast.error("Unable to delete account.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <SettingsCard
      title="Danger Zone"
      description="This action cannot be undone."
    >

      <div className="rounded-2xl border border-red-300 bg-red-50 p-6">

        <h3 className="font-semibold text-red-700">
          Delete Account
        </h3>

        <p className="mt-2 text-sm text-red-600">
          Enter your password to permanently delete your account.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="mt-5 w-full rounded-xl border p-3"
        />

        <button
          disabled={loading}
          onClick={handleDelete}
          className="mt-5 rounded-xl bg-red-600 px-6 py-3 text-white"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

      </div>

    </SettingsCard>
  );
}

export default DangerZone;