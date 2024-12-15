import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface BanUserPageProps {
  isAuthenticated: boolean;
}

interface BanUserState {
  username: string;
  confirmUsername: string;
}

const BanUserPage: React.FC<BanUserPageProps> = ({ isAuthenticated }) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BanUserState>({
    username: "",
    confirmUsername: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBanUser = async (e: FormEvent<HTMLFormElement>) => {
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

      const banResponse = await axios.put(
        `${apiUrl}/api/users/${userId}/toggle-ban`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(
        banResponse.data.message || "User ban status toggled successfully!",
      );

      setFormData({
        username: "",
        confirmUsername: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An unknown error occurred while toggling user ban. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">Toggle User Ban</h2>
          <form onSubmit={handleBanUser} className="w-full">
            <div className="form-control mx-auto w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="input input-bordered w-full max-w-xs"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mx-auto mt-4 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Username</span>
              </label>
              <input
                type="text"
                name="confirmUsername"
                placeholder="Confirm username"
                className="input input-bordered w-full max-w-xs"
                value={formData.confirmUsername}
                onChange={handleInputChange}
                required
              />
            </div>

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
              <button type="submit" className="btn btn-error w-full">
                Toggle Ban
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BanUserPage;
