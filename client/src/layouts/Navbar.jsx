import { useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const titles = {
  "/dashboard": "Dashboard",
  "/career-hub": "Career Hub",
  "/resume": "Resume",
  "/mentor": "AI Mentor",
  "/profile": "Profile",
  "/settings": "Settings",
  "/jobs": "Jobs",
};

function Navbar() {

  const { pathname } = useLocation();
  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const pageTitle =
    Object.entries(titles).find(([key]) =>
      pathname.startsWith(key)
    )?.[1] || "CareerOS";

  const name = user?.sub || "User";

  const initials = name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (

    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between transition-colors">

      <div>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {pageTitle}
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back.
        </p>

      </div>

      <div className="flex items-center gap-5">

        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:scale-105 transition"
        >

          {theme === "dark"
            ? <Sun size={20}/>
            : <Moon size={20}/>
          }

        </button>

        <div className="text-right">

          <p className="font-semibold dark:text-white">
            {name}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Software Engineer
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {initials}
        </div>

      </div>

    </header>

  );
}

export default Navbar;