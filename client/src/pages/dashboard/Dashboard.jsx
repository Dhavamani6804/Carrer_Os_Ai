import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "./components/WelcomeBanner";
import DashboardCard from "./components/DashboardCard";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";

function Dashboard() {
    return (
        <DashboardLayout>

            <div className="space-y-8">

                <WelcomeBanner />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <DashboardCard
                        title="Resume Score"
                        value="82%"
                        subtitle="Excellent progress"
                    />

                    <DashboardCard
                        title="Applications"
                        value="12"
                        subtitle="Jobs applied"
                    />

                    <DashboardCard
                        title="Interviews"
                        value="3"
                        subtitle="Upcoming"
                    />

                    <DashboardCard
                        title="Skills"
                        value="15"
                        subtitle="Skills added"
                    />

                </div>

                <QuickActions />

                <RecentActivity />

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;