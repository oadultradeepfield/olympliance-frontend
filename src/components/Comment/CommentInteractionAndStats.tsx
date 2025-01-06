import { ClockIcon } from "@heroicons/react/24/outline";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import CommentVoteButton from "./CommentVoteButton";
import ReplyCommentButton from "./ReplyCommentButton";
import { Badge } from "../../data/badgeData";
import EditCommentButton from "./EditCommentButton";
import DeleteCommentButton from "./DeleteCommentButton";
import UserRoleBadge from "../Common/UserRoleBadge";
import { Link } from "react-router-dom";
import HidePlainTextButton from "../Common/HidePlainTextButton";

interface CommentInteractionAndStatsProps {
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
  showPlainText: boolean;
  setShowPlainText: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInteractionAndStats: React.FC<CommentInteractionAndStatsProps> = ({
  badge,
  threadId,
  comment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
  showPlainText,
  setShowPlainText,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
      {!comment.is_deleted && (
        <>
          <CommentVoteButton
            comment={comment}
            setShouldRefetchInteractions={setShouldRefetchInteractions}
            setShouldShowLoading={setShouldShowLoading}
            userInteractions={userInteractions}
            setUserInteractions={setUserInteractions}
            interactionType="upvote"
          />
          <CommentVoteButton
            comment={comment}
            setShouldRefetchInteractions={setShouldRefetchInteractions}
            setShouldShowLoading={setShouldShowLoading}
            userInteractions={userInteractions}
            setUserInteractions={setUserInteractions}
            interactionType="downvote"
          />
          <ReplyCommentButton
            threadId={threadId}
            parentCommentId={comment.comment_id}
            content={comment.content}
          />
        </>
      )}
      <div className="flex items-center space-x-1">
        <ClockIcon className="h-4 w-4" />
        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center space-x-1">
        <span>
          Author:{" "}
          {comment.user?.is_deleted ? (
            "[Deleted User]"
          ) : (
            <Link
              className="link-hover link"
              to={`/user/${comment.user?.username}`}
            >
              {comment.user?.username}
            </Link>
          )}
          {badge && (
            <span className="ml-1 text-xs">
              ({badge.title}: {comment.user?.reputation})
            </span>
          )}
        </span>
      </div>
      <UserRoleBadge roleId={comment?.user?.role_id ?? 0} />
      <EditCommentButton comment={comment} />
      <DeleteCommentButton comment={comment} />
      {!comment.is_deleted && (
        <HidePlainTextButton
          size={4}
          showPlainText={showPlainText}
          setShowPlainText={setShowPlainText}
        />
      )}
    </div>
  );
};

export default CommentInteractionAndStats;
