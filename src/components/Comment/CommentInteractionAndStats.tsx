import { ClockIcon } from "@heroicons/react/24/outline";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import CommentVoteButton from "./CommentVoteButton";
import CommentReplyButton from "./ReplyCommentButton";
import { Badge } from "../../data/badgeData";

interface CommentInteractionAndStatsProps {
  isAuthenticated: boolean;
  userId: number;
  badge: Badge | null;
  threadId: number;
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
  setShouldShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
  userInteractions: Record<number, { upvoted: boolean; downvoted: boolean }>;
  setUserInteractions: React.Dispatch<
    React.SetStateAction<
      Record<number, { upvoted: boolean; downvoted: boolean }>
    >
  >;
}

const CommentInteractionAndStats: React.FC<CommentInteractionAndStatsProps> = ({
  isAuthenticated,
  userId,
  badge,
  threadId,
  comment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
      {!comment.is_deleted && (
        <>
          <CommentVoteButton
            userId={userId}
            isAuthenticated={isAuthenticated}
            comment={comment}
            setShouldRefetchInteractions={setShouldRefetchInteractions}
            setShouldShowLoading={setShouldShowLoading}
            userInteractions={userInteractions}
            setUserInteractions={setUserInteractions}
            interactionType="upvote"
          />
          <CommentVoteButton
            userId={userId}
            isAuthenticated={isAuthenticated}
            comment={comment}
            setShouldRefetchInteractions={setShouldRefetchInteractions}
            setShouldShowLoading={setShouldShowLoading}
            userInteractions={userInteractions}
            setUserInteractions={setUserInteractions}
            interactionType="downvote"
          />
          <CommentReplyButton
            threadId={threadId}
            parentCommentId={comment.comment_id}
            content={comment.content}
            isAuthenticated={isAuthenticated}
          />
        </>
      )}
      <div className="flex items-center space-x-1">
        <ClockIcon className="h-4 w-4" />
        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center space-x-1">
        <span>
          Author: {comment.user?.username}
          {badge && (
            <span className="ml-1 text-xs">
              ({badge.title}: {comment.user?.reputation})
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default CommentInteractionAndStats;
