import { useEffect, useState } from "react";

import {
  getApplications,
  getCareerHubStats,
} from "../services/careerHubService";

export default function useCareerHub() {
  const [applications, setApplications] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);

    try {
      const [applicationsData, statsData] =
        await Promise.all([
          getApplications(),
          getCareerHubStats(),
        ]);

      setApplications(applicationsData);

      setStats(statsData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    applications,
    stats,
    loading,
    refresh,
  };
}