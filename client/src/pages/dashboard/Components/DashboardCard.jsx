import Card from "../../../components/ui/Card";

function DashboardCard({ title, value, subtitle }) {
    return (
        <Card className="hover:shadow-xl transition-all duration-300">

            <h3 className="text-slate-500 text-sm font-medium">
                {title}
            </h3>

            <h2 className="text-4xl font-bold mt-2">
                {value}
            </h2>

            <p className="text-slate-400 text-sm mt-2">
                {subtitle}
            </p>

        </Card>
    );
}

export default DashboardCard;