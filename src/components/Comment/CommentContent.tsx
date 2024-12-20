import UserRoleBadge from "../Common/UserRoleBadge";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import EditCommentButton from "./EditCommentButton";
import DeleteCommentButton from "./DeleteCommentButton";
import CommentInteractionAndStats from "./CommentInteractionAndStats";
import { Badge } from "../../data/badgeData";

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
      <div className="mb-3 text-base">
        <UserRoleBadge roleId={comment?.user?.role_id ?? 0} />
        <span
          className={comment.is_deleted ? "italic text-base-content/75" : ""}
        >
          {comment.is_deleted ? "[Comment deleted]" : comment.content}
        </span>
        <EditCommentButton comment={comment} />
        <DeleteCommentButton comment={comment} />
      </div>
      <CommentInteractionAndStats
        badge={badge}
        threadId={threadId}
        comment={comment}
        setShouldShowLoading={setShouldShowLoading}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
        userInteractions={userInteractions}
        setUserInteractions={setUserInteractions}
      />
    </div>
  );
};

export default CommentContent;
