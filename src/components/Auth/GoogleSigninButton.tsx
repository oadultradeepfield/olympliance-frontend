import { apiUrl } from "../../data/apiUrl";
import GoogleIcon from "./GoogleIcon";

const GoogleSigninButton = () => {
  const handleGoogleSignin = () => {
    const googleOauthUrl = `${apiUrl}/api/auth/google`;
    window.location.href = googleOauthUrl;
  };

  return (
    <button
      className="btn btn-outline mb-2 w-full max-w-xs gap-2 normal-case"
      onClick={handleGoogleSignin}
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
};

export default GoogleSigninButton;
