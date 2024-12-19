import EditThreadModal from "./EditThreadModal";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import DeleteThreadModal from "./DeleteThreadModal";
import { Badge } from "../../data/badgeData";
import UserRoleBadge from "../Common/UserRoleBadge";

interface ThreadContentProps {
  userId: number;
  roleId: number;
  thread: (ThreadData & { user?: UserInfo }) | null;
  apiUrl: string;
  category: string;
  badge: Badge | null;
}

const ThreadContent: React.FC<ThreadContentProps> = ({
  userId,
  roleId,
  thread,
  apiUrl,
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
        <EditThreadModal userId={userId} apiUrl={apiUrl} thread={thread} />
        <DeleteThreadModal
          userId={userId}
          roleId={roleId}
          thread={thread}
          apiUrl={apiUrl}
          category={category}
        />
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
            <UserRoleBadge roleId={roleId} />
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
