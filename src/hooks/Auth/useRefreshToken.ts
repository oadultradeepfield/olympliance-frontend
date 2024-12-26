import { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshAccessToken = useCallback(async () => {
    const current_token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        `${apiUrl}/api/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${current_token}`,
          },
        },
      );

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);

      dispatch(
        setAuthState({
          isAuthenticated: true,
        }),
      );

      scheduleNextRefresh(access_token);
    } catch (error: any) {
      console.error(
        "Error refreshing access_token:",
        error.response?.data?.error || "Unknown error",
      );
      localStorage.removeItem("access_token");
      dispatch(
        setAuthState({
          isAuthenticated: false,
        }),
      );
    }
  }, [dispatch]);

  const calculateRefreshTime = useCallback((token: string): number => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));

      const expirationTime = decoded.exp * 1000;
      const refreshTime = expirationTime - 3 * 60 * 1000;

      return Math.max(refreshTime - Date.now(), 0);
    } catch (error) {
      console.error("Failed to decode access token:", error);
      return 0;
    }
  }, []);

  const scheduleNextRefresh = useCallback(
    (token: string) => {
      const timeUntilRefresh = calculateRefreshTime(token);

      if (timeUntilRefresh > 0) {
        setTimeout(() => {
          refreshAccessToken();
        }, timeUntilRefresh);
      }
    },
    [calculateRefreshTime, refreshAccessToken],
  );

  useEffect(() => {
    const current_token = localStorage.getItem("access_token");

    if (current_token) {
      scheduleNextRefresh(current_token);
    }
  }, [scheduleNextRefresh]);

  return { refreshAccessToken };
};
