import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const apiUrl: string = import.meta.env.VITE_API_URL;

interface AuthState {
  username: string;
  password: string;
  confirmPassword?: string;
}

interface AuthPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<AuthState>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred during login. Please try again later.";
      setError(errorMessage);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
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

      setFormData({
        username: "",
        password: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred during registration. Please try again later.";
      setError(errorMessage);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setFormData({
      username: "",
      password: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className="w-full"
          >
            <div className="form-control mx-auto w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder={
                  isLogin ? "Enter your username" : "Choose a username"
                }
                className="input input-bordered w-full max-w-xs"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control relative mx-auto mt-4 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a password"
                  }
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-base-content-200 absolute right-2 top-1/2 -translate-y-1/2 hover:text-secondary focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="form-control relative mx-auto mt-4 w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="input input-bordered w-full max-w-xs pr-10"
                    value={formData.confirmPassword || ""}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-base-content-200 absolute right-2 top-1/2 -translate-y-1/2 hover:text-secondary focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 text-center text-sm text-error">
                Error: {error}
              </div>
            )}

            {success && (
              <div className="mt-4 text-center text-sm text-success">
                {success}
              </div>
            )}

            <div className="form-control mx-auto mt-6 w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <p className="text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleAuthMode} className="link link-primary ml-1">
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
