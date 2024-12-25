import { useAuthForm } from "../../hooks/Auth/useAuthForm";
import PasswordVisibilityToggle from "../../components/Common/PasswordVisibilityToggle";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import GoogleSigninButton from "../../components/Auth/GoogleSigninButton";
import { Link } from "react-router-dom"; // Make sure to import Link for navigation

const AuthPage = () => {
  const {
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
  } = useAuthForm();

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <div className="card w-96 border-2 border-base-content/15 bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title mb-4 text-2xl">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          <GoogleSigninButton />
          <div className="divider my-2">OR</div>
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
                <PasswordVisibilityToggle
                  showPassword={showPassword}
                  onToggle={togglePasswordVisibility}
                />
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
                  <PasswordVisibilityToggle
                    showPassword={showConfirmPassword}
                    onToggle={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>
            )}

            {error && <MessageDisplay message={error} type="error" />}
            {success && <MessageDisplay message={success} type="success" />}

            {!isLogin && (
              <div className="form-control mx-auto mt-4 flex w-full max-w-xs">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="checkbox-primary checkbox"
                  />
                  <span className="ml-3 text-start text-sm">
                    By registering, you agree to our
                    <Link
                      to="/terms-of-service"
                      className="link link-primary ml-1"
                    >
                      Terms of Service
                    </Link>{" "}
                    and
                    <Link
                      to="/privacy-policy"
                      className="link link-primary ml-1"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
            )}

            <div className="form-control mx-auto mt-6 w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleAuthMode} className="link link-primary ml-1">
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
