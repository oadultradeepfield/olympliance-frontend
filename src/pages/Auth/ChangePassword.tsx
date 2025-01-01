import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useChangePassword } from "../../hooks/Auth/useChangePassword";
import PasswordVisibilityToggle from "../../components/Common/PasswordVisibilityToggle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface PasswordState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const { changePassword, error, success } = useChangePassword();

  const [formData, setFormData] = useState<PasswordState>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    if (field === "current") {
      setShowCurrentPassword((prev) => !prev);
    } else if (field === "new") {
      setShowNewPassword((prev) => !prev);
    } else if (field === "confirm") {
      setShowConfirmNewPassword((prev) => !prev);
    }
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changePassword(formData);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 border-base-content/15 bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">Change Password</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control relative mx-auto w-full max-w-xs">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Enter current password"
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
                <PasswordVisibilityToggle
                  showPassword={showCurrentPassword}
                  onToggle={() => togglePasswordVisibility("current")}
                />
              </div>
            </div>
            <div className="form-control relative mx-auto mt-4 w-full max-w-xs">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                <PasswordVisibilityToggle
                  showPassword={showNewPassword}
                  onToggle={() => togglePasswordVisibility("new")}
                />
              </div>
            </div>
            <div className="form-control relative mx-auto mt-4 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  required
                />
                <PasswordVisibilityToggle
                  showPassword={showConfirmNewPassword}
                  onToggle={() => togglePasswordVisibility("confirm")}
                />
              </div>
            </div>

            {error && <MessageDisplay message={error} type="error" />}
            {success && <MessageDisplay message={success} type="success" />}

            <div className="form-control mx-auto mt-6 w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
