import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BrainCircuit,
  BriefcaseBusiness,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Career Hub",
    icon: BriefcaseBusiness,
    path: "/career-hub",
  },
  {
    title: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    title: "AI Mentor",
    icon: BrainCircuit,
    path: "/mentor",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (

    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors">

      <div className="p-8 border-b border-slate-100 dark:border-slate-800">

        <h1 className="text-3xl font-extrabold text-blue-600">
          CareerOS
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Career Companion
        </p>

      </div>

      <nav className="flex-1 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>

          );

        })}

      </nav>

      <div className="border-t border-slate-100 dark:border-slate-800 p-5">

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >

          <LogOut size={20}/>

          Logout

        </button>

      </div>

    </aside>

  );
}

export default Sidebar;