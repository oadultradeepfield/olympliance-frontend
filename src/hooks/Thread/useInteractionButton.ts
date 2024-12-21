import axios from "axios";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { InteractionState } from "../../data/interactionData";
import { apiUrl } from "../../data/apiUrl";

export const useInteractionButton = (
  threadId: number,
  interactions: InteractionState,
  setThread: React.Dispatch<
    React.SetStateAction<(ThreadData & { user?: UserInfo }) | null>
  >,
  setInteractions: React.Dispatch<React.SetStateAction<InteractionState>>,
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const handleInteraction = async (type: keyof InteractionState) => {
    try {
      const token = localStorage.getItem("access_token");
      const currentInteraction = interactions[type];

      if (currentInteraction.active && currentInteraction.id) {
        await axios.put(
          `${apiUrl}/api/interactions/${currentInteraction.id}`,
          { interaction_type: type },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setInteractions((prev: InteractionState) => ({
          ...prev,
          [type]: { active: false, id: 0 },
        }));

        setThread((prev: (ThreadData & { user?: UserInfo }) | null) => {
          if (!prev) return null;
          const newStats = { ...prev.stats };

          if (type === "upvote") newStats.upvotes -= 1;
          if (type === "downvote") newStats.downvotes -= 1;
          if (type === "follow") newStats.followers -= 1;

          return { ...prev, stats: newStats };
        });
      } else {
        if (
          (type === "upvote" &&
            interactions.downvote.active &&
            interactions.downvote.id) ||
          (type === "downvote" &&
            interactions.upvote.active &&
            interactions.upvote.id)
        ) {
          const oppositeType = type === "upvote" ? "downvote" : "upvote";
          const oppositeInteraction = interactions[oppositeType];

          await axios.put(
            `${apiUrl}/api/interactions/${oppositeInteraction.id}`,
            { interaction_type: oppositeType },
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }

        const response = await axios.post(
          `${apiUrl}/api/interactions`,
          { thread_id: threadId, interaction_type: type },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setInteractions((prev: InteractionState) => {
          const newState = { ...prev };

          if (type === "upvote" || type === "downvote") {
            const oppositeType = type === "upvote" ? "downvote" : "upvote";
            newState[oppositeType] = { active: false, id: 0 };
          }

          newState[type] = { active: true, id: response.data.interaction_id };

          return newState;
        });

        setThread((prev: (ThreadData & { user?: UserInfo }) | null) => {
          if (!prev) return null;
          const newStats = { ...prev.stats };

          if (type === "upvote") {
            newStats.upvotes += 1;
            if (interactions.downvote.active) newStats.downvotes -= 1;
          } else if (type === "downvote") {
            newStats.downvotes += 1;
            if (interactions.upvote.active) newStats.upvotes -= 1;
          } else if (type === "follow") {
            newStats.followers += 1;
          }

          return { ...prev, stats: newStats };
        });
      }

      setShouldRefetchInteractions((prev) => !prev);
    } catch (error) {
      console.error(`Error with ${type} interaction:`, error);
    }
  };

  return { handleInteraction };
};
