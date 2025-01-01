import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

interface UsernameState {
  newUsername: string;
  confirmUsername: string;
}

interface UseChangeUsernameResult {
  changeUsername: (formData: UsernameState) => void;
  error: string;
  success: string;
}

export const useChangeUsername = (): UseChangeUsernameResult => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const changeUsername = async (formData: UsernameState) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(`${apiUrl}/api/users/change-username`, {
        new_username: formData.newUsername,
        confirm_username: formData.confirmUsername,
      });

      setSuccess(response.data.message || "Username changed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred while changing username. Please try again.";
      setError(errorMessage);
    }
  };

  return {
    changeUsername,
    error,
    success,
  };
};
