import { useLeaderboard } from "../../hooks/User/useLeaderboard";
import Loading from "../Common/Loading";
import LeaderboardRow from "./LeaderboardRow";

const LeaderboardTable = () => {
  const { leaderboard, loading } = useLeaderboard();

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-2xl overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Reputation</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <LeaderboardRow key={index} user={user} index={index} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Reputation</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LeaderboardTable;
