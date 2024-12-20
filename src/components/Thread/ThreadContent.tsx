import EditThreadButton from "./EditThreadButton";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import DeleteThreadButton from "./DeleteThreadButton";
import { Badge } from "../../data/badgeData";
import UserRoleBadge from "../Common/UserRoleBadge";

interface ThreadContentProps {
  thread: (ThreadData & { user?: UserInfo }) | null;
  category: string;
  badge: Badge | null;
}

const ThreadContent: React.FC<ThreadContentProps> = ({
  thread,
  category,
  badge,
}) => {
  if (!thread) {
    return null;
  }

  return (
    <>
      <div className="mb-2 flex items-center">
        <div className="mr-2 text-3xl font-bold">{thread.title}</div>
        <EditThreadButton thread={thread} />
        <DeleteThreadButton thread={thread} category={category} />
      </div>
      <div className="mb-3 text-base text-base-content/75">
        <span>
          By {thread.user?.username}
          {badge && (
            <span className="ml-1 text-sm">
              ({badge.title}: {thread.user?.reputation})
            </span>
          )}
          <span className="-mr-2 ml-2">
            <UserRoleBadge roleId={thread.user?.role_id ?? 0} />
          </span>{" "}
          {" • "}
          {new Date(thread.created_at).toLocaleDateString()}
        </span>
      </div>
      {thread.tags.length > 0 && (
        <div className="tags-container mb-2 space-x-1">
          {thread.tags.map((tag, index) => (
            <div key={index} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
      )}
      <div className="mb-6 max-w-none text-lg">{thread.content}</div>
    </>
  );
};

export default ThreadContent;
