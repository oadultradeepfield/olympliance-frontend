import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

interface HeaderProps {
  isLoggedIn: boolean;
  userAvatar: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userAvatar }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, []);

  return (
    <div className="navbar bg-base-100 top-0 w-full py-3 max-w-5xl mx-auto">
      <div className="navbar-start">
        <div className="btn btn-ghost px-2">
          <img className="w-10" src="/logo.png" alt="App Logo" />
          <a href="/" className="text-xl">
            Olympliance
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className={`btn ${isLoggedIn ? "" : "mx-4"} rounded-full`}
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="btn btn-ghost avatar">
              <div className="w-10 rounded-full">
                <img src={userAvatar} alt="User Avatar" />
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content bg-base-200 z-[1] rounded-box mt-2 w-52 p-2 shadow -ml-36">
              <li>
                <a>View Followed Threads</a>
              </li>
              <li>
                <a>Change Password</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <a href="/login" className="btn btn-primary">
            Login/Register
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
