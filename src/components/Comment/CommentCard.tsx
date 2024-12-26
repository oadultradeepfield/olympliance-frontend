import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import ReputationBadge from "../Common/ReputationBadge";
import CommentContent from "./CommentContent";
import { getBadge } from "../../utils/getBadge";

interface CommentCardProps {
  threadId: number;
  reputation: number;
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

const CommentCard: React.FC<CommentCardProps> = ({
  threadId,
  reputation,
  comment,
  parentComment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
}) => {
  const badge = comment.user ? getBadge(comment.user.reputation) : null;
  return (
    <div className="card mx-auto mb-3 flex w-full max-w-5xl border-2 border-base-content/15 bg-base-100 px-2 py-1">
      <div className="card-body flex flex-row items-start space-x-2 p-3">
        <ReputationBadge
          reputation={reputation}
          is_deleted={comment.user?.is_deleted || false}
        />
        <CommentContent
          threadId={threadId}
          badge={badge}
          comment={comment}
          parentComment={parentComment}
          setShouldShowLoading={setShouldShowLoading}
          setShouldRefetchInteractions={setShouldRefetchInteractions}
          userInteractions={userInteractions}
          setUserInteractions={setUserInteractions}
        />
      </div>
    </div>
  );
};

export default CommentCard;
