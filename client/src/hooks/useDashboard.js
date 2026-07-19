import { useCallback, useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

export default function useDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const response = await dashboardService.getDashboard();

            setDashboard(response);

        } catch (err) {

            setError(err);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchDashboard();

    }, [fetchDashboard]);

    return {

        dashboard,

        loading,

        error,

        refreshDashboard: fetchDashboard

    };

}