import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("theme") || "light";

  });

  useEffect(() => {

    const html = document.documentElement;

    html.classList.remove("light");
    html.classList.remove("dark");

    html.classList.add(theme);

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  function toggleTheme() {

    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );

  }

  const value = useMemo(() => ({

    theme,

    setTheme,

    toggleTheme,

  }), [theme]);

  return (

    <ThemeContext.Provider value={value}>

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  const context = useContext(
    ThemeContext
  );

  if (!context) {

    throw new Error(
      "ThemeProvider missing."
    );

  }

  return context;

}