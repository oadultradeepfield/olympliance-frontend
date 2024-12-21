import { Leaderboard } from "../../data/leaderboardData";
import LeaderboardRank from "./LeaderboardRank";
import LeaderboardUserInfo from "./LeaderboardUserinfo";

interface LeaderboardRowProps {
  user: Leaderboard;
  index: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ user, index }) => {
  return (
    <tr>
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
