import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user } = useAuth();

    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

            <h2 className="text-2xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-6">

                <Bell
                    className="cursor-pointer"
                    size={22}
                />

                <div className="text-right">

                    <p className="font-semibold">
                        {user?.sub}
                    </p>

                    <p className="text-sm text-slate-500">
                        User
                    </p>

                </div>

            </div>

        </header>
    );
}

export default Navbar;