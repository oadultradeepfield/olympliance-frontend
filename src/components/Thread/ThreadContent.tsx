import { useState, useEffect } from "react";
import EditThreadButton from "./EditThreadButton";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import DeleteThreadButton from "./DeleteThreadButton";
import { Badge } from "../../data/badgeData";
import UserRoleBadge from "../Common/UserRoleBadge";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";
import { Link } from "react-router-dom";
import HidePlainTextButton from "../Common/HidePlainTextButton";

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
  const [showPlainText, setShowPlainText] = useState<boolean>(true);
  const [filteredContent, setFilteredContent] = useState<string>(
    thread?.content as string,
  );

  useEffect(() => {
    if (!showPlainText) {
      const codeRegex = /```[\s\S]*?```|`[^`]+`/g;
      const equationRegex = /\$\$[\s\S]*?\$\$|\$[^\$]+\$/g;
      const imageRegex = /!\[([^\]]*)\]\(([^)]*)\)/g;

      const content = thread?.content || "";

      const codeMatches = content.match(codeRegex) || [];
      const contentWithoutCode = content.replace(codeRegex, "");

      const equationMatches = contentWithoutCode.match(equationRegex) || [];
      const imageMatches = contentWithoutCode.match(imageRegex) || [];

      const combinedContent = [
        ...new Set([...codeMatches, ...equationMatches, ...imageMatches]),
      ].join("\n\n");

      setFilteredContent(combinedContent);
    } else {
      setFilteredContent(thread?.content || "");
    }
  }, [showPlainText, thread?.content]);

  if (!thread) {
    return null;
  }

  return (
    <>
      <div className="mb-2 flex items-center">
        <div className="mr-2 text-3xl font-bold">{thread.title}</div>
        <HidePlainTextButton
          size={6}
          showPlainText={showPlainText}
          setShowPlainText={setShowPlainText}
        />
        <EditThreadButton thread={thread} />
        <DeleteThreadButton thread={thread} category={category} />
      </div>
      <div className="mb-3 text-base text-base-content/75">
        <span>
          By{" "}
          {thread.user?.is_deleted ? (
            "[Deleted User]"
          ) : (
            <Link
              className="link-hover link"
              to={`/user/${thread.user?.username}`}
            >
              {thread.user?.username}
            </Link>
          )}
          {badge && (
            <span className="ml-1 text-sm">
              ({badge.title}: {thread.user?.reputation})
            </span>
          )}
          <span className="ml-2">
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
      <div className="my-6 max-w-none">
        <MarkdownRenderer content={filteredContent} />
      </div>
    </>
  );
};

export default ThreadContent;
