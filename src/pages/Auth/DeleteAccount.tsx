import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useDeleteAccount } from "../../hooks/Auth/useDeleteAccount";

const DeleteAccount: React.FC = () => {
  const [confirmText, setConfirmText] = useState("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const { deleteAccount, error, success } = useDeleteAccount();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const isValidConfirmation =
    confirmText.trim().toLowerCase() === "permanently delete my account";

  const handleDeleteAccount = async () => {
    if (!isValidConfirmation) return;

    try {
      deleteAccount();
      if (success) {
        setTimeout(() => navigate("/", { replace: true }), 2000);
      }
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="w-96 rounded-xl border-2 border-base-content/15 bg-base-100 p-6">
        <h2 className="mb-6 text-2xl font-bold text-error">Delete Account</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content/75">
              Type "permanently delete my account" to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <p className="text-sm text-error">
            Warning: This action is permanent and will delete all your data
            immediately.
          </p>

          <button
            className={`btn w-full rounded-lg ${isValidConfirmation ? "btn-error" : "btn-outline btn-error"}`}
            onClick={handleDeleteAccount}
            disabled={!isValidConfirmation}
          >
            Delete Account
          </button>
        </div>

        {error && <MessageDisplay message={error} type="error" />}
        {success && <MessageDisplay message={success} type="success" />}
      </div>
    </div>
  );
};

export default DeleteAccount;
