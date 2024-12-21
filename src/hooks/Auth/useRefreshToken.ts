import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("No refresh token found.");

      const response = await axios.post(`${apiUrl}/api/refresh-token`, {
        refresh_token: refreshToken,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      dispatch(
        setAuthState({
          isAuthenticated: true,
        }),
      );
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
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
