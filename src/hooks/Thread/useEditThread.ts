import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useEditThread = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleEditThread = async (
    threadId: number,
    title: string,
    content: string,
    tags: string[],
  ) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const newThread = {
        title,
        content,
        tags,
      };

      const response = await axios.put(
        `${apiUrl}/api/threads/${threadId}`,
        newThread,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while updating the thread. Please try again.";
      setError(errorMessage);
    }
  };

  return { error, success, handleEditThread };
};
