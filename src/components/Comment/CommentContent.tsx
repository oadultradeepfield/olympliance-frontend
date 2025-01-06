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
      const codeRegex = /```[\s\S]*?```|`[^`]+`/g;
      const equationRegex = /\$\$[\s\S]*?\$\$|\$[^\$]+\$/g;

      const codeMatches = filteredContent.match(codeRegex) || [];
      const equationMatches = filteredContent.match(equationRegex) || [];

      const combinedContent = [...codeMatches, ...equationMatches].join("\n\n");

      setFilteredContent(combinedContent);
    } else {
      setFilteredContent(comment?.content || "");
    }
  }, [filteredContent, showPlainText]);

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
