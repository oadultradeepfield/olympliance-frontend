import { useState } from "react";
import axios from "axios";

interface FormState {
  username: string;
  confirmUsername: string;
}

interface UseUserManagementProps {
  apiUrl: string;
  actionType: "moderator" | "ban";
  onSuccess?: () => void;
}

export const useUserManagement = ({
  apiUrl,
  actionType,
  onSuccess,
}: UseUserManagementProps) => {
  const [formData, setFormData] = useState<FormState>({
    username: "",
    confirmUsername: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.username !== formData.confirmUsername) {
      setError("Usernames do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userIdResponse = await axios.get(
        `${apiUrl}/api/users/get-id/${formData.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userId = userIdResponse.data.user_id;
      const endpoint =
        actionType === "moderator"
          ? `${apiUrl}/api/users/${userId}/toggle-moderator`
          : `${apiUrl}/api/users/${userId}/toggle-ban`;

      const response = await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(
        response.data.message ||
          `User ${actionType} status toggled successfully!`,
      );

      setFormData({
        username: "",
        confirmUsername: "",
      });

      onSuccess?.();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        `An unknown error occurred while toggling ${actionType} status. Please try again.`;
      setError(errorMessage);
    }
  };

  return {
    formData,
    error,
    success,
    handleInputChange,
    handleSubmit,
  };
};