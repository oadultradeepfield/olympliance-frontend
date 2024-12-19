import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";
import useTheme from "../../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="swap swap-rotate mr-4 rounded-full bg-base-200 p-3 transition-all duration-300 hover:bg-base-300"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : (
        <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </div>
  );
};

export default ThemeToggle;
