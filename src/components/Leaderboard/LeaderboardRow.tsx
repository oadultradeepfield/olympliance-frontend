import { Leaderboard } from "../../data/leaderboardData";
import LeaderboardRank from "./LeaderboardRank";
import LeaderboardUserInfo from "./LeaderboardUserinfo";

interface LeaderboardRowProps {
  user: Leaderboard;
  index: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ user, index }) => {
  const rowClass =
    index === 0
      ? "bg-yellow-100"
      : index === 1
        ? "bg-gray-100"
        : index === 2
          ? "bg-red-100"
          : "";

  return (
    <tr className={rowClass}>
      <th>
        <LeaderboardRank index={index} />
      </th>
      <td>
        <LeaderboardUserInfo user={user} />
      </td>
      <td>{user.reputation}</td>
    </tr>
  );
};

export default LeaderboardRow;
