import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <div className="navbar top-0 mx-auto w-full max-w-5xl bg-base-100 py-3">
      <div className="navbar-start">
        <Link to="/">
          <div className="btn btn-ghost px-2">
            <img className="w-8 sm:w-10" src="/logo.png" alt="App Logo" />
            <div className="text-lg sm:text-xl">Olympliance</div>
          </div>
        </Link>
      </div>
      <div className="navbar-end px-2">
        <ThemeToggle />
        {isAuthenticated ? (
          <div className="flex items-center">
            <UserDropdown />
            <div className="hidden flex-col sm:flex">
              <div className="-mb-1">Welcome back,</div>
              <div className="max-w-[14ch] truncate font-bold">
                @{user.username}
              </div>
            </div>
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
