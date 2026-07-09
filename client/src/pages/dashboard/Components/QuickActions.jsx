import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

function QuickActions() {
    return (
        <Card>

            <h2 className="text-xl font-semibold mb-5">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Button fullWidth>
                    Upload Resume
                </Button>

                <Button fullWidth variant="secondary">
                    AI Review
                </Button>

                <Button fullWidth variant="secondary">
                    Find Jobs
                </Button>

                <Button fullWidth variant="secondary">
                    Mock Interview
                </Button>

            </div>

        </Card>
    );
}

export default QuickActions;