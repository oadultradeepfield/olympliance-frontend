import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useChangeUsername } from "../../hooks/Auth/useChangeUsername";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface UsernameState {
  newUsername: string;
  confirmUsername: string;
}

const ChangeUsername: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const { changeUsername, error, success } = useChangeUsername();

  const [formData, setFormData] = useState<UsernameState>({
    newUsername: "",
    confirmUsername: "",
  });

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
    changeUsername(formData);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 border-base-content/15 bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">Change Username</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control relative mx-auto w-full max-w-xs">
              <label className="label">
                <span className="label-text">New Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="newUsername"
                  placeholder="Enter new username"
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.newUsername}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-control relative mx-auto mt-4 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="confirmUsername"
                  placeholder="Confirm new username"
                  className="input input-bordered w-full max-w-xs pr-10"
                  value={formData.confirmUsername}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {error && <MessageDisplay message={error} type="error" />}
            {success && <MessageDisplay message={success} type="success" />}

            <div className="form-control mx-auto mt-6 w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full">
                Change Username
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsername;
