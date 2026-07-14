import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  deleteAccount,
  deleteCareerHub,
  resetPreparationProgress,
} from "../services/accountService";

import { useAuth } from "../context/AuthContext";

function useAccount() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  async function resetProgress() {

    try {

      await resetPreparationProgress();

      toast.success("Preparation progress reset.");

    } catch {

      toast.error("Unable to reset progress.");

    }

  }

  async function clearCareerHub() {

    try {

      await deleteCareerHub();

      toast.success("Career Hub cleared.");

    } catch {

      toast.error("Unable to delete Career Hub.");

    }

  }

  async function removeAccount() {

    try {

      await deleteAccount();

      logout();

      navigate("/login");

    } catch {

      toast.error("Unable to delete account.");

    }

  }

  return {

    resetProgress,

    clearCareerHub,

    removeAccount

  };

}

export default useAccount;