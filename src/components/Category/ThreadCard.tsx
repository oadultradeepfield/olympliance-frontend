import { useNavigate } from "react-router-dom";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import ThreadStats from "./ThreadStats";
import UserRoleBadge from "../Common/UserRoleBadge";
import ReputationBadge from "../Common/ReputationBadge";

interface ThreadCardProps {
  thread: ThreadData & { user?: UserInfo };
  categoryTitle: string;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  categoryTitle,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${categoryTitle}/thread/${thread.thread_id}`);
  };

  return (
    <div
      className="card mx-auto mb-3 flex w-full max-w-3xl border-2 border-base-content/15 bg-base-100 px-2 py-1 transition-all duration-300 hover:cursor-pointer hover:border-secondary hover:text-secondary"
      onClick={handleCardClick}
    >
      <div className="card-body flex flex-row items-start p-3">
        {thread.user && (
          <div className="mr-2 mt-1">
            <ReputationBadge
              reputation={thread.user.reputation}
              is_deleted={thread.user.is_deleted}
            />
          </div>
        )}
        <div className="flex flex-grow flex-col">
          <div className="mb-1 text-base font-semibold" title={thread.title}>
            {thread.user && <UserRoleBadge roleId={thread.user.role_id} />}
            <span className={thread.user?.role_id! > 0 ? "ml-2" : ""}>
              {thread.title}
            </span>
          </div>
          <ThreadStats
            upvotes={thread.stats.upvotes}
            downvotes={thread.stats.downvotes}
            comments={thread.stats.comments}
            createdAt={thread.created_at}
            user={thread.user}
          />
        </div>
      </div>
    </div>
  );
};
