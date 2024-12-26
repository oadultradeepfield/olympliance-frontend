import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useEditComment = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleEditComment = async (commentId: number, comment: string) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/comments/${commentId}`,
        { content: comment },
        {},
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess("");
        (
          document.getElementById(
            `edit_comment_modal_${commentId}`,
          ) as HTMLDialogElement
        ).close();
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while updating the comment. Please try again.";
      setError(errorMessage);
    }
  };

  return { error, success, handleEditComment };
};
