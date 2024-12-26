import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useDeleteAccount } from "../../hooks/Auth/useDeleteAccount";

const DeleteAccount: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const { deleteAccount, error, success } = useDeleteAccount();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleDeleteAccount = () => {
    deleteAccount();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 border-base-content/15 bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">Delete Account</h2>
          {!isDeleting ? (
            <div className="w-full">
              <p className="mb-4 text-sm text-error">
                Deleting your account is irreversible. All your data will be
                permanently removed.
              </p>
              <button
                className="btn btn-error w-full"
                onClick={() => setIsDeleting(true)}
              >
                Delete Account
              </button>
            </div>
          ) : (
            <div className="modal w-96">
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
              <p className="pt-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="modal-action mt-4 flex justify-between">
                <button className="btn" onClick={() => setIsDeleting(false)}>
                  Cancel
                </button>
                <button className="btn btn-error" onClick={handleDeleteAccount}>
                  Confirm
                </button>
              </div>
            </div>
          )}

          {error && <MessageDisplay message={error} type="error" />}
          {success && <MessageDisplay message={success} type="success" />}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
