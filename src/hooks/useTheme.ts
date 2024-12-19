import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  const applyTheme = (currentTheme: Theme) => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const themeToApply = currentTheme === "system" ? systemTheme : currentTheme;
    document.documentElement.setAttribute("data-theme", themeToApply);
    localStorage.setItem("theme", currentTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const systemThemeListener = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      const updateSystemTheme = () =>
        setTheme(systemThemeListener.matches ? "dark" : "light");
      systemThemeListener.addEventListener("change", updateSystemTheme);

      return () =>
        systemThemeListener.removeEventListener("change", updateSystemTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
