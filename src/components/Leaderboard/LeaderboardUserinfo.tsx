import { Leaderboard } from "../../data/leaderboardData";
import { getBadge } from "../../utils/getBadge";
import ReputationBadge from "../Common/ReputationBadge";
import { Link } from "react-router-dom";

interface LeaderboardUserInfoProps {
  user: Leaderboard;
}

const LeaderboardUserInfo: React.FC<LeaderboardUserInfoProps> = ({ user }) => {
  const badge = getBadge(user.reputation);

  return (
    <Link
      className="link-hover link flex flex-row items-center gap-3"
      to={`/user/${user.username}`}
    >
      <div className="avatar">
        <ReputationBadge reputation={user.reputation} is_deleted={false} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="max-w-[20ch] truncate font-bold md:max-w-[40ch]">
          {user.username}
        </div>
        <div className="text-sm opacity-50">{badge.title}</div>
      </div>
    </Link>
  );
};

export default LeaderboardUserInfo;
