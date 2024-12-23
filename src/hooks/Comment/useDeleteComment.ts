import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useDeleteComment = () => {
  const deleteComment = async (commentId: number) => {
    try {
      const access_token = localStorage.getItem("access_token");
      await axios.delete(`${apiUrl}/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An error occurred while deleting the comment. Please try again.";
      console.error(errorMessage);
    }
  };

  return { deleteComment };
};
