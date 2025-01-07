import { useState, useEffect } from "react";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import CommentInteractionAndStats from "./CommentInteractionAndStats";
import { Badge } from "../../data/badgeData";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";

interface CommentContentProps {
  threadId: number;
  badge: Badge | null;
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
  parentComment: CommentData;
  setShouldShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
  userInteractions: Record<number, { upvoted: boolean; downvoted: boolean }>;
  setUserInteractions: React.Dispatch<
    React.SetStateAction<
      Record<number, { upvoted: boolean; downvoted: boolean }>
    >
  >;
}

const CommentContent: React.FC<CommentContentProps> = ({
  threadId,
  badge,
  comment,
  parentComment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
}) => {
  const [showPlainText, setShowPlainText] = useState<boolean>(true);
  const [filteredContent, setFilteredContent] = useState<string>(
    comment?.content as string,
  );

  useEffect(() => {
    if (!showPlainText) {
      const codeBlockRegex = /```[\s\S]*?```/g;
      const inlineCodeRegex = /`[^`]+`/g;

      const content = comment?.content || "";
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
      setFilteredContent(comment?.content || "");
    }
  }, [showPlainText, comment?.content]);

  return (
    <div className="flex flex-grow flex-col">
      {parentComment && (
        <div className="mb-2 bg-primary-content/25 p-2 text-sm italic text-base-content/75">
          <strong>Replied to: </strong>
          {parentComment.content?.length > 50
            ? `\"${parentComment.content.slice(0, 50)}...\"`
            : parentComment.is_deleted
              ? "[Comment deleted]"
              : `\"${parentComment.content}\"`}
        </div>
      )}
      <div className="mb-2 text-base">
        <span
          className={comment.is_deleted ? "italic text-base-content/75" : ""}
        >
          {comment.is_deleted ? (
            "[Comment deleted]"
          ) : (
            <MarkdownRenderer className="-mt-2" content={filteredContent} />
          )}
        </span>
      </div>
      <CommentInteractionAndStats
        badge={badge}
        threadId={threadId}
        comment={comment}
        setShouldShowLoading={setShouldShowLoading}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
        userInteractions={userInteractions}
        setUserInteractions={setUserInteractions}
        showPlainText={showPlainText}
        setShowPlainText={setShowPlainText}
      />
    </div>
  );
};

export default CommentContent;
