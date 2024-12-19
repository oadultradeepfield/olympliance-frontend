import { Link } from "react-router-dom";
import ReputationBadge from "../Common/ReputationBadge";

interface UserDropdownProps {
  userReputation: number;
  roleId: number;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userReputation,
  roleId,
  onLogout,
}) => (
  <div className="dropdown" tabIndex={0}>
    <button className="avatar btn btn-ghost mr-0 p-0 sm:mr-3">
      <ReputationBadge reputation={userReputation} />
    </button>
    <ul className="tabIndex={0} menu dropdown-content menu-sm z-[1] -ml-44 mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
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
        <button onClick={onLogout}>Logout</button>
      </li>
    </ul>
  </div>
);

export default UserDropdown;
