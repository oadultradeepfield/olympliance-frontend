import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { useNavigate } from "react-router-dom";

interface FormState {
  username: string;
  confirmUsername: string;
}

interface UseUserManagementProps {
  actionType: "moderator" | "ban";
  onSuccess?: () => void;
}

export const useUserManagement = ({
  actionType,
  onSuccess,
}: UseUserManagementProps) => {
  const [formData, setFormData] = useState<FormState>({
    username: "",
    confirmUsername: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

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
      const userIdResponse = await axios.get(
        `${apiUrl}/api/users/get-id/${formData.username}`,
      );

      const userId = userIdResponse.data.user_id;
      const endpoint =
        actionType === "moderator"
          ? `${apiUrl}/api/users/${userId}/toggle-moderator`
          : `${apiUrl}/api/users/${userId}/toggle-ban`;

      const response = await axios.put(endpoint, {}, {});

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
        navigate(
          actionType === "moderator" ? "/assign-moderator" : "/ban-user",
        );
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
