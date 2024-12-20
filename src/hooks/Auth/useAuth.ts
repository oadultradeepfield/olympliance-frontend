import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { RootState } from "../../store";
import { setUser, logout } from "../../slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios
        .get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          dispatch(
            setUser({
              username: data.username,
              user_id: data.user_id,
              role_id: data.role_id,
              reputation: data.reputation,
              is_banned: data.is_banned,
            }),
          );
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          dispatch(logout());
        });
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    window.location.reload();
  };

  return {
    isAuthenticated,
    user,
    handleLogout,
  };
};
