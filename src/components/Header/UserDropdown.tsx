import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ReputationBadge from "../Common/ReputationBadge";
import { useLogout } from "../../hooks/Auth/useLogout";

const UserDropdown = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    useLogout();
  };

  return (
    <div className="dropdown dropdown-end" tabIndex={0}>
      <button className="avatar mr-0 p-0 sm:mr-3">
        <ReputationBadge reputation={user.reputation} />
      </button>
      <ul className="tabIndex={0} menu dropdown-content menu-sm z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
        {user.role_id > 0 && (
          <li>
            <Link to="/ban-user">Ban User</Link>
          </li>
        )}
        {user.role_id > 1 && (
          <li>
            <Link to="/assign-moderator">Assign Moderator</Link>
          </li>
        )}
        <li>
          <Link to="/followed-threads">View Followed Threads</Link>
        </li>
        <li>
          <Link to="/change-username">Change Username</Link>
        </li>
        <li>
          <Link to="/change-password">Change Password</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
