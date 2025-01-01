import { useDispatch } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { logout } from "../../slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/api/logout`);
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
};
