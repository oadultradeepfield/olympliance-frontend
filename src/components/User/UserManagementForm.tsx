import { useUserManagement } from "../../hooks/User/useUserManagement";
import { MessageDisplay } from "../Common/MessageDisplay";

interface UserManagementFormProps {
  title: string;
  actionType: "moderator" | "ban";
  buttonText: string;
  buttonClassName: string;
  onSuccess?: () => void;
  username?: string;
}

export const UserManagementForm: React.FC<UserManagementFormProps> = ({
  title,
  actionType,
  buttonText,
  buttonClassName,
  onSuccess,
  username,
}) => {
  const { formData, error, success, handleInputChange, handleSubmit } =
    useUserManagement({ actionType, onSuccess });

  if (username) {
    formData.username = username;
    formData.confirmUsername = username;
  }

  return (
    <div className="card w-96 border-2 border-base-content/15 bg-base-100">
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-4 text-2xl">{title}</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="form-control mx-auto w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className={`input input-bordered w-full max-w-xs ${username ? "cursor-not-allowed" : ""}`}
              value={formData.username}
              onChange={handleInputChange}
              readOnly={!!username}
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
              className={`input input-bordered w-full max-w-xs ${username ? "cursor-not-allowed" : ""}`}
              value={formData.confirmUsername}
              onChange={handleInputChange}
              readOnly={!!username}
              required
            />
          </div>

          {error && <MessageDisplay message={error} type="error" />}
          {success && <MessageDisplay message={success} type="success" />}

          <div className="form-control mx-auto mt-6 w-full max-w-xs">
            <button type="submit" className={`btn ${buttonClassName} w-full`}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
