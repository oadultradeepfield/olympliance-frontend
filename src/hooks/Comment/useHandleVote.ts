import axios from "axios";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import { apiUrl } from "../../data/apiUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface UseHandleVoteProps {
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

export const useHandleVote = ({
  comment,
  setShouldShowLoading,
  setShouldRefetchInteractions,
  userInteractions,
  setUserInteractions,
}: UseHandleVoteProps) => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      setShouldShowLoading(true);
      const currentInteractions = comment?.interactions;

      const existingInteraction = currentInteractions?.find(
        (interaction) => interaction.user_id === userId,
      );

      if (existingInteraction) {
        await axios.put(
          `${apiUrl}/api/interactions/${existingInteraction.interaction_id}`,
          { interaction_type: voteType },
        );
      } else {
        await axios.post(`${apiUrl}/api/interactions`, {
          comment_id: comment.comment_id,
          interaction_type: voteType,
        });
      }

      setUserInteractions((prev) => ({
        ...prev,
        [comment.comment_id]: {
          upvoted: voteType === "upvote",
          downvoted: voteType === "downvote",
        },
      }));

      setShouldRefetchInteractions((prev) => !prev);
    } catch (error: any) {
      console.error("Error handling vote:", error);
    } finally {
      setShouldShowLoading(false);
    }
  };

  return {
    handleVote,
    comment,
    userInteractions,
  };
};
