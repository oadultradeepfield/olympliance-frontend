import { Leaderboard } from "../../data/leaderboardData";
import { getBadge } from "../../utils/getBadge";
import ReputationBadge from "../Common/ReputationBadge";

interface LeaderboardUserInfoProps {
  user: Leaderboard;
}

const LeaderboardUserInfo: React.FC<LeaderboardUserInfoProps> = ({ user }) => {
  const badge = getBadge(user.reputation);

  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <ReputationBadge reputation={user.reputation} />
      </div>
      <div>
        <div className="font-bold">{user.username}</div>
        <div className="text-sm opacity-50">{badge.title}</div>
      </div>
    </div>
  );
};

export default LeaderboardUserInfo;
