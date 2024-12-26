import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { useLogout } from "./useLogout";

interface UseDeleteAccountResult {
  deleteAccount: () => void;
  error: string;
  success: string;
}

export const useDeleteAccount = (): UseDeleteAccountResult => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { handleLogout } = useLogout();

  const deleteAccount = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.delete(`${apiUrl}/api/users/delete`);

      setSuccess(response.data.message || "Account deleted successfully!");
      setTimeout(() => {
        setSuccess("");
        handleLogout();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An unknown error occurred while deleting the account. Please try again.";
      setError(errorMessage);
    }
  };

  return {
    deleteAccount,
    error,
    success,
  };
};
