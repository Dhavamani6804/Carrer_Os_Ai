import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "./components/DashboardCard";
import WelcomeBanner from "./components/WelcomeBanner";
import TodaysFocus from "./components/Today'sFocus";

import Spinner from "../../components/ui/spinner";

import useDashboard from "../../hooks/useDashboard";

function Dashboard() {

    const {

        dashboard,

        loading,

        error

    } = useDashboard();

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <Spinner />

                </div>

            </DashboardLayout>

        );

    }

    if (error) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <div className="text-center">

                        <h2 className="text-2xl font-bold text-red-600">

                            Failed to load dashboard

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Please refresh the page and try again.

                        </p>

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <WelcomeBanner

                    name={dashboard?.name}

                />

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">

                    {/* <DashboardCard

                        title="Resume Score"

                        value={`${dashboard?.resumeScore ?? 0}%`}

                        subtitle="Resume ATS Score"

                    /> */}

                    <DashboardCard

                        title="Applications"

                        value={dashboard?.applications ?? 0}

                        subtitle="Jobs Applied"

                    />

                    <DashboardCard

                        title="Interviews"

                        value={dashboard?.interviews ?? 0}

                        subtitle="Interview Stages"

                    />

                    {/* <DashboardCard

                        title="Skills"

                        value={dashboard?.skills ?? 0}

                        subtitle="Skills Added"

                    /> */}

                </div>

                <TodaysFocus

                    currentStreak={dashboard?.currentStreak ?? 0}

                    bestStreak={dashboard?.bestStreak ?? 0}

                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;