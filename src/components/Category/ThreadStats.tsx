import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { UserInfo } from "../../data/userData";
import { getBadge } from "../../utils/getBadge";

interface ThreadStatsProps {
  upvotes: number;
  downvotes: number;
  comments: number;
  createdAt: string;
  user?: UserInfo;
}

const ThreadStats: React.FC<ThreadStatsProps> = ({
  upvotes,
  downvotes,
  comments,
  createdAt,
  user,
}) => {
  const badge = user ? getBadge(user.reputation) : null;

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
      <div className="flex items-center space-x-1">
        <ArrowUpIcon className="h-4 w-4 text-success" />
        <span>{upvotes}</span>
      </div>
      <div className="flex items-center space-x-1">
        <ArrowDownIcon className="h-4 w-4 text-error" />
        <span>{downvotes}</span>
      </div>
      <div className="flex items-center space-x-1">
        <ChatBubbleLeftIcon className="h-4 w-4" />
        <span>{comments}</span>
      </div>
      <div className="flex items-center space-x-1">
        <ClockIcon className="h-4 w-4" />
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      {user && (
        <div className="flex items-center space-x-1">
          <span>
            Author: {user.is_deleted ? "[Deleted User]" : user.username}
            {badge && (
              <span className="ml-1 text-xs">
                ({badge.title}: {user.reputation})
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default ThreadStats;
