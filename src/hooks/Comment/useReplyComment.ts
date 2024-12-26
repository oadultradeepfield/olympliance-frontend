import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useReplyComment = () => {
  const replyComment = async (
    threadId: number,
    parentCommentId: number,
    content: string,
  ) => {
    try {
      const newComment = {
        thread_id: threadId,
        parent_comment_id: parentCommentId,
        content: content,
      };

      await axios.post(`${apiUrl}/api/comments`, newComment, {});

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred while posting the comment. Please try again.";
      console.error(errorMessage);
    }
  };

  return { replyComment };
};
