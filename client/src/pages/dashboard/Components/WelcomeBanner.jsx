import Card from "../../../components/ui/Card";

function WelcomeBanner({ name }) {

    return (

        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

            <h1 className="text-3xl font-bold">

                Welcome back 👋

            </h1>

            <p className="mt-2 opacity-90">

                {name}

            </p>

            <p className="mt-4">

                Let's build your career today.

            </p>

        </Card>

    );

}

export default WelcomeBanner;