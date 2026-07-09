import Card from "../../../components/ui/Card";

const activities = [
    "Welcome to CareerOS 🎉",
    "Complete your profile",
    "Upload your resume",
];

function RecentActivity() {
    return (
        <Card>

            <h2 className="text-xl font-semibold mb-4">
                Recent Activity
            </h2>

            <ul className="space-y-3">

                {activities.map((item) => (
                    <li
                        key={item}
                        className="text-slate-600 border-b pb-2"
                    >
                        {item}
                    </li>
                ))}

            </ul>

        </Card>
    );
}

export default RecentActivity;