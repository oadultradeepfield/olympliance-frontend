import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useHandleVote } from "../../hooks/Comment/useHandleVote";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import { useNavigate } from "react-router-dom";

interface CommentVoteButtonProps {
  userId: number;
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
  isAuthenticated: boolean;
  setShouldShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
  userInteractions: Record<number, { upvoted: boolean; downvoted: boolean }>;
  setUserInteractions: React.Dispatch<
    React.SetStateAction<
      Record<number, { upvoted: boolean; downvoted: boolean }>
    >
  >;
  interactionType: "upvote" | "downvote";
}

const CommentVoteButton: React.FC<CommentVoteButtonProps> = ({
  userId,
  comment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
  isAuthenticated,
  interactionType,
}) => {
  const { handleVote } = useHandleVote({
    userId: userId,
    comment: comment,
    setShouldShowLoading: setShouldShowLoading,
    userInteractions: userInteractions,
    setShouldRefetchInteractions: setShouldRefetchInteractions,
    setUserInteractions: setUserInteractions,
  });

  const navigate = useNavigate();

  const isActive =
    interactionType === "upvote"
      ? userInteractions[comment!.comment_id]?.upvoted
      : userInteractions[comment!.comment_id]?.downvoted;

  const stats =
    interactionType === "upvote"
      ? comment?.stats.upvotes
      : comment?.stats.downvotes;

  const buttonClass =
    interactionType === "upvote" ? "btn btn-success" : "btn btn-error";

  const Icon = interactionType === "upvote" ? ArrowUpIcon : ArrowDownIcon;

  return (
    <button
      onClick={
        isAuthenticated
          ? () => handleVote(interactionType)
          : () => navigate("/login")
      }
      className={`${buttonClass} btn-xs flex items-center ${isActive ? "" : "btn-outline"}`}
    >
      <Icon className="mr-1 h-3 w-3" />
      {stats}
    </button>
  );
};

export default CommentVoteButton;
