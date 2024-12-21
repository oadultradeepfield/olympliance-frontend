interface LeaderboardRankProps {
  index: number;
}

const LeaderboardRank: React.FC<LeaderboardRankProps> = ({ index }) => {
  const isEmoji = index < 3;
  const labelContent =
    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

  return (
    <label className={isEmoji ? "text-2xl font-bold" : "text-base"}>
      {labelContent}
    </label>
  );
};

export default LeaderboardRank;
