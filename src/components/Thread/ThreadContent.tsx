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
      const codeBlockRegex = /```[\s\S]*?```/g;
      const inlineCodeRegex = /`[^`]+`/g;

      const content = thread?.content || "";
      const codeMatches: string[] = [];
      const codePositions: [number, number][] = [];

      let match;
      while ((match = codeBlockRegex.exec(content)) !== null) {
        codeMatches.push(match[0]);
        codePositions.push([match.index, match.index + match[0].length]);
      }
      while ((match = inlineCodeRegex.exec(content)) !== null) {
        codeMatches.push(match[0]);
        codePositions.push([match.index, match.index + match[0].length]);
      }

      const isInsideCodeBlock = (matchIndex: number, matchLength: number) => {
        return codePositions.some(
          ([start, end]) =>
            matchIndex >= start && matchIndex + matchLength <= end,
        );
      };

      const equationRegex = /\$\$[\s\S]*?\$\$|\$[^\$]+\$/g;
      const imageRegex = /!\[([^\]]*)\]\(([^)]*)\)/g;

      const equationMatches = [];
      const imageMatches = [];

      while ((match = equationRegex.exec(content)) !== null) {
        if (!isInsideCodeBlock(match.index, match[0].length)) {
          equationMatches.push(match[0]);
        }
      }

      while ((match = imageRegex.exec(content)) !== null) {
        if (!isInsideCodeBlock(match.index, match[0].length)) {
          imageMatches.push(match[0]);
        }
      }

      const combinedContent = [
        ...codeMatches,
        ...equationMatches,
        ...imageMatches,
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
