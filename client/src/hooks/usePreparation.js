import { useEffect, useState } from "react";
import { startPreparation } from "../services/preparationService";

function usePreparation(applicationId) {

  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadPreparation() {

    if (!applicationId) return;

    try {

      setLoading(true);

      setError("");

      const response = await startPreparation(applicationId);

      console.log("Preparation Response:", response);

      setPlan(response);

    } catch (err) {

      console.error(err);

      setError("Unable to load preparation plan.");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadPreparation();

  }, [applicationId]);

  return {

    plan,

    loading,

    error,

    refresh: loadPreparation,

  };

}

export default usePreparation;