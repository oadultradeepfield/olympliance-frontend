import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/refresh-token`,
        {},
        { withCredentials: true },
      );

      const { token } = response.data;
      localStorage.setItem("access_token", token);

      dispatch(
        setAuthState({
          isAuthenticated: true,
        }),
      );
    } catch (error: any) {
      console.error("Error refreshing token:", error.response.data.error);
      localStorage.removeItem("access_token");
      dispatch(
        setAuthState({
          isAuthenticated: false,
        }),
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshAccessToken();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return { refreshAccessToken };
};
