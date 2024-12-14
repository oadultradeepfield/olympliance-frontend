import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

import grandmasterBadge from "../assets/01_badges_grandmaster.png";
import masterBadge from "../assets/02_badges_master.png";
import candidateMasterBadge from "../assets/03_badges_candidate_master.png";
import expertBadge from "../assets/04_badges_expert.png";
import specialistBadge from "../assets/05_badges_specialist.png";
import apprenticeBadge from "../assets/06_badges_apprentice.png";
import pupilBadge from "../assets/07_badges_pupil.png";
import noviceBadge from "../assets/08_badges_novice.png";

interface HeaderProps {
  isLoggedIn: boolean;
  userReputation: number;
  roleId: number;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  userReputation,
  roleId,
}) => {
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

  const getBadgeImage = (reputation: number) => {
    if (reputation >= 3500) return grandmasterBadge;
    if (reputation >= 2000) return masterBadge;
    if (reputation >= 800) return candidateMasterBadge;
    if (reputation >= 400) return expertBadge;
    if (reputation >= 100) return specialistBadge;
    if (reputation >= 50) return apprenticeBadge;
    if (reputation >= 15) return pupilBadge;
    return noviceBadge;
  };

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
                <img src={getBadgeImage(userReputation)} alt="User Badge" />
              </div>
            </button>
            <ul className="menu dropdown-content menu-sm z-[1] -ml-36 mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
              {roleId > 0 && (
                <li>
                  <Link to="/ban-user">Ban User</Link>
                </li>
              )}
              {roleId > 1 && (
                <li>
                  <Link to="/assign-moderator">Assign Moderator</Link>
                </li>
              )}
              <li>
                <Link to="/followed-threads">View Followed Threads</Link>
              </li>
              <li>
                <Link to="/change-password">Change Password</Link>
              </li>
              <li>
                <Link to="/">Logout</Link>
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
