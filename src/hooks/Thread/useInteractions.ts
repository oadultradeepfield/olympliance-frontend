import { useState, useEffect } from "react";
import axios from "axios";
import { Interaction } from "../../data/interactionData";
import { InteractionState } from "../../data/interactionData";
import { apiUrl } from "../../data/apiUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useInteractions = (
  threadId: number,
  shouldRefetch: boolean,
): {
  interactions: InteractionState;
  setInteractions: React.Dispatch<React.SetStateAction<InteractionState>>;
} => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);
  const [interactions, setInteractions] = useState<InteractionState>({
    upvote: { active: false, id: 0 },
    downvote: { active: false, id: 0 },
    follow: { active: false, id: 0 },
  });

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await axios.get<{ interactions: Interaction[] }>(
          `${apiUrl}/api/interactions?thread_id=${threadId}&user_id=${userId}`,
          { withCredentials: false },
        );

        const existingInteractions = response.data.interactions;
        const interactionState: InteractionState = {
          upvote: { active: false, id: 0 },
          downvote: { active: false, id: 0 },
          follow: { active: false, id: 0 },
        };

        existingInteractions.forEach((interaction) => {
          switch (interaction.interaction_type) {
            case "upvote":
              interactionState.upvote = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
            case "downvote":
              interactionState.downvote = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
            case "follow":
              interactionState.follow = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
          }
        });
        setInteractions(interactionState);
      } catch (error: any) {
        console.error(
          "Error fetching interactions:",
          error.response.data.error,
        );
      }
    };

    if (threadId && userId) {
      fetchInteractions();
    }
  }, [threadId, userId, shouldRefetch]);

  return {
    interactions,
    setInteractions,
  };
};

export default useInteractions;
