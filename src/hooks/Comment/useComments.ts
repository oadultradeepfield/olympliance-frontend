import { useState, useEffect } from "react";
import axios from "axios";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { apiUrl } from "../../data/apiUrl";
import { Interaction } from "../../data/interactionData";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useComments = (
  threadId: number,
  sortBy: string,
  page: number,
  shouldRefetchInteractions: boolean,
  shouldShowLoading: boolean,
) => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);
  const [comments, setComments] = useState<
    (CommentData & { user?: UserInfo; interactions?: Interaction[] })[]
  >([]);
  const [parentCommentMap, setParentCommentMap] = useState<{
    [key: number]: CommentData;
  }>({});
  const [userInteractions, setUserInteractions] = useState<
    Record<number, { upvoted: boolean; downvoted: boolean }>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (shouldShowLoading) setLoading(true);

        const commentsResponse = await axios.get(`${apiUrl}/api/comments`, {
          withCredentials: false,
          params: {
            thread_id: threadId,
            sort_by: sortBy,
            page: page,
            per_page: 10,
          },
        });

        const commentsWithUsersAndInteractions = await Promise.all(
          commentsResponse.data.comments.map(async (comment: CommentData) => {
            const [userResponse, interactionsResponse] = await Promise.all([
              axios.get(`${apiUrl}/api/userinfo?id=${comment.user_id}`, {
                withCredentials: false,
              }),
              axios.get(`${apiUrl}/api/interactions`, {
                withCredentials: false,
                params: { comment_id: comment.comment_id, user_id: userId },
              }),
            ]);

            const userUpvote = interactionsResponse.data.interactions.some(
              (interaction: Interaction) =>
                interaction.user_id === userId &&
                interaction.interaction_type === "upvote",
            );

            const userDownvote = interactionsResponse.data.interactions.some(
              (interaction: Interaction) =>
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
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching comments:", error.response.data.error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [threadId, sortBy, page, shouldRefetchInteractions, userId]);

  return {
    comments,
    setComments,
    parentCommentMap,
    userInteractions,
    setUserInteractions,
    loading,
  };
};
