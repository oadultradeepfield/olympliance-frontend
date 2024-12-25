import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../data/apiUrl";
import axios from "axios";
import { setAuthState } from "../../slices/authSlice";

export const useGoogleAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const access_token = urlParams.get("access_token");

      if (access_token) {
        try {
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

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } catch (error) {
          console.error("Google OAuth login failed:", error);
        }
      }
    };

    handleGoogleCallback();
  }, [dispatch]);
};
