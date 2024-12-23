import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
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
    } catch (error: any) {
      console.error(
        "Error refreshing access_token:",
        error.response.data.error,
      );
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
      14.5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return { refreshAccessToken };
};
