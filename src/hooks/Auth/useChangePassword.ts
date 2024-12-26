import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

interface PasswordState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UseChangePasswordResult {
  changePassword: (formData: PasswordState) => void;
  error: string;
  success: string;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmNewPassword: boolean;
  togglePasswordVisibility: (field: "current" | "new" | "confirm") => void;
}

export const useChangePassword = (): UseChangePasswordResult => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const changePassword = async (formData: PasswordState) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `${apiUrl}/api/users/change-password`,
        {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          confirm_password: formData.confirmNewPassword,
        },
        {},
      );

      setSuccess(response.data.message || "Password changed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred while changing password. Please try again.";
      setError(errorMessage);
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    if (field === "current") {
      setShowCurrentPassword((prev) => !prev);
    } else if (field === "new") {
      setShowNewPassword((prev) => !prev);
    } else if (field === "confirm") {
      setShowConfirmNewPassword((prev) => !prev);
    }
  };

  return {
    changePassword,
    error,
    success,
    showCurrentPassword,
    showNewPassword,
    showConfirmNewPassword,
    togglePasswordVisibility,
  };
};
