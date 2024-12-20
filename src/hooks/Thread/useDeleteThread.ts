import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../data/apiUrl";

export const useDeleteThread = (category: string) => {
  const navigate = useNavigate();

  const deleteThread = async (threadId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/threads/${threadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        navigate(`/${category}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while deleting the thread. Please try again.";
      console.error(errorMessage);
    }
  };

  return { deleteThread };
};