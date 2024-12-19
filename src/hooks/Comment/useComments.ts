import { useState, useEffect } from "react";
import axios from "axios";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { apiUrl } from "../../data/apiUrl";

interface InteractionsInfo {
  user_id: string;
  interaction_type: string;
}

export const useComments = (
  threadId: string,
  sortBy: string,
  page: number,
  userId: string,
  shouldRefetchInteractions: boolean,
) => {
  const [comments, setComments] = useState<
    (CommentData & { user?: UserInfo; interactions?: InteractionsInfo[] })[]
  >([]);
  const [parentCommentMap, setParentCommentMap] = useState<{
    [key: number]: CommentData;
  }>({});
  const [userInteractions, setUserInteractions] = useState<
    Record<number, { upvoted: boolean; downvoted: boolean }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (isFirstLoad) setLoading(true);

        const commentsResponse = await axios.get(`${apiUrl}/api/comments`, {
          params: {
            thread_id: threadId,
            sort_by: sortBy,
            page,
            per_page: 10,
          },
        });

        const commentsWithUsersAndInteractions = await Promise.all(
          commentsResponse.data.comments.map(async (comment: CommentData) => {
            const [userResponse, interactionsResponse] = await Promise.all([
              axios.get(`${apiUrl}/api/users/${comment.user_id}`),
              axios.get(`${apiUrl}/api/interactions`, {
                params: { comment_id: comment.comment_id, user_id: userId },
              }),
            ]);

            const userUpvote = interactionsResponse.data.interactions.some(
              (interaction: InteractionsInfo) =>
                interaction.user_id === userId &&
                interaction.interaction_type === "upvote",
            );

            const userDownvote = interactionsResponse.data.interactions.some(
              (interaction: InteractionsInfo) =>
                interaction.user_id === userId &&
                interaction.interaction_type === "downvote",
            );

            return {
              ...comment,
              user: userResponse.data,
              interactions: interactionsResponse.data.interactions,
              userInteractions: {
                upvoted: userUpvote,
                downvoted: userDownvote,
              },
            };
          }),
        );

        const commentMap = commentsWithUsersAndInteractions.reduce(
          (acc, comment) => ({ ...acc, [comment.comment_id]: comment }),
          {},
        );

        const updatedUserInteractions = commentsWithUsersAndInteractions.reduce(
          (acc, comment) => ({
            ...acc,
            [comment.comment_id]: comment.userInteractions,
          }),
          {},
        );

        setParentCommentMap(commentMap);
        setComments(commentsWithUsersAndInteractions);
        setUserInteractions(updatedUserInteractions);

        if (isFirstLoad) {
          setIsFirstLoad(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [
    apiUrl,
    threadId,
    sortBy,
    page,
    shouldRefetchInteractions,
    userId,
    isFirstLoad,
  ]);

  return { comments, parentCommentMap, userInteractions, loading, setLoading };
};
