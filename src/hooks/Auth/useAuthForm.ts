import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../data/apiUrl";
import { setAuthState } from "../../slices/authSlice";

export const useAuthForm = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    confirmPassword?: string;
  }>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${apiUrl}/api/login`,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);

      const userResponse = await axios.get(`${apiUrl}/api/users`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      dispatch(
        setAuthState({
          isAuthenticated: true,
          user: {
            username: userResponse.data.username,
            user_id: userResponse.data.user_id,
            role_id: userResponse.data.role_id,
            reputation: userResponse.data.reputation,
            is_banned: userResponse.data.is_banned,
          },
        }),
      );

      navigate("/");
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "An unknown error occurred during login. Please try again later.",
      );
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        username: formData.username,
        password: formData.password,
      });
      setSuccess(response.data.message);
      setIsLogin(true);
      setFormData({ username: "", password: "" });
      setTimeout(() => setSuccess(""), 1000);
    } catch (error: any) {
      setError(
        error.response?.data?.error ||
          "An unknown error occurred during registration. Please try again later.",
      );
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setFormData({ username: "", password: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return {
    formData,
    showPassword,
    showConfirmPassword,
    isLogin,
    error,
    success,
    handleInputChange,
    handleLogin,
    handleRegister,
    toggleAuthMode,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
