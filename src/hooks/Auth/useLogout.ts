import { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { logout } from "../../slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {});

      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch]);

  return { handleLogout };
};
