import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ReputationBadge from "../Common/ReputationBadge";
import { useLogout } from "../../hooks/Auth/useLogout";

const UserDropdown = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { handleLogout } = useLogout();

  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end" tabIndex={0}>
      <button className="avatar mr-0 p-0 sm:mr-3">
        <ReputationBadge
          reputation={user.reputation}
          is_deleted={user.is_deleted}
        />
      </button>
      <ul className="menu dropdown-content menu-sm z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
        <li>
          <Link to="/followed-threads">Followed Threads</Link>
        </li>
        <li>
          <Link to={`/user/${user.username}`}>Edit Profile</Link>
        </li>
        {user.role_id > 1 && (
          <li>
            <Link to="/assign-moderator">Assign Moderator</Link>
          </li>
        )}
        {user.role_id > 0 && (
          <li>
            <Link to="/ban-user">Ban User</Link>
          </li>
        )}
        <li>
          <button onClick={handleLogoutAndRedirect}>Logout</button>
        </li>
        <li>
          <Link to="/delete-account" className="text-error">
            Delete Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
