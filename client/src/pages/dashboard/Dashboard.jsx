import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
const { logout } = useAuth();

const handleLogout = () => {
    logout();
    navigate("/login");
};

const { user } = useAuth();


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold">
                Welcome to CareerOS 🚀
            </h1>

            <p className="mt-4 text-gray-600">
                Authentication Successful
            </p>

            <button
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg"
            >
                Logout
            </button>

        </div>
    );
}

export default Dashboard;