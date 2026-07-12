import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BrainCircuit,
  Briefcase,
  BriefcaseBusiness,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
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
    title: "Career Hub",
    icon: BriefcaseBusiness,
    path: "/career-hub",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    path: "/jobs",
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

  const handleLogout = () => {
    logout();

    navigate("/login");
  };
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600">CareerOS</h1>
      </div>

      <nav className="flex-1 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
