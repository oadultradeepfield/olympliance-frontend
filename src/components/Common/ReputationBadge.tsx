import { getBadge } from "../../utils/getBadge";

interface ReputationBadgeProps {
  reputation: number;
}

const ReputationBadge: React.FC<ReputationBadgeProps> = ({ reputation }) => {
  const badge = getBadge(reputation);

  if (!badge) return null;

  return (
    <div className="avatar shrink-0">
      <div className="bg-neutral-focus h-10 w-10 rounded-full text-neutral-content">
        <img
          src={badge.image}
          alt={`${badge.title} Badge`}
          className="h-8 w-8"
        />
      </div>
    </div>
  );
};

export default ReputationBadge;
