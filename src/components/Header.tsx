import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

interface HeaderProps {
  isLoggedIn: boolean;
  userAvatar: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userAvatar }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    return (
      (localStorage.getItem("theme") as "light" | "dark" | "system") || "system"
    );
  });

  useEffect(() => {
    const applyTheme = (theme: "light" | "dark" | "system") => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document.documentElement.setAttribute("data-theme", systemTheme);
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);
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
    <div className="navbar top-0 mx-auto w-full max-w-5xl bg-base-100 py-3">
      <div className="navbar-start">
        <div className="btn btn-ghost px-2">
          <img className="w-10" src="/logo.png" alt="App Logo" />
          <Link to="/" className="text-xl">
            Olympliance
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className={`btn ${isLoggedIn ? "" : "mx-4"} rounded-full`}
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="avatar btn btn-ghost">
              <div className="w-10 rounded-full">
                <img src={userAvatar} alt="User Avatar" />
              </div>
            </button>
            <ul className="menu dropdown-content menu-sm z-[1] -ml-36 mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
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
          <Link to="/login" className="btn btn-primary">
            Login/Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
