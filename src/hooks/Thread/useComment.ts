import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useComment = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleComment = async (threadId: number, content: string) => {
    try {
      const token = localStorage.getItem("token");
      const newComment = {
        thread_id: threadId,
        content: content,
      };

      const response = await axios.post(`${apiUrl}/api/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An unknown error occurred while posting the comment. Please try again.";
      setError(errorMessage);
    } finally {
    }
  };

  return {
    error,
    success,
    handleComment,
  };
};
