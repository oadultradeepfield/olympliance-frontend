import { Link } from "react-router-dom";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { slugify } from "../../utils/slugify";
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
}) => (
  <Link
    to={`/thread/${categoryTitle}-${slugify(thread.title)}-${thread.thread_id}`}
  >
    <div className="card mx-auto mb-3 flex w-full max-w-3xl border-2 bg-base-100 px-2 py-1 transition-all duration-300 hover:border-secondary hover:text-secondary">
      <div className="card-body flex flex-row items-start p-3">
        <div className="mr-2 mt-1">
          {thread.user && (
            <ReputationBadge reputation={thread.user.reputation} />
          )}
        </div>
        <div className="flex flex-grow flex-col">
          <div className="mb-1 text-base font-semibold" title={thread.title}>
            {thread.user && <UserRoleBadge roleId={thread.user.role_id} />}
            <span className="ml-2">{thread.title}</span>
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
  </Link>
);
