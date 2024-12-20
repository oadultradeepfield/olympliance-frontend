import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAuthState } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`${apiUrl}/api/users`, {
            headers: { Authorization: `Bearer ${token}` },
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
        } catch (error) {
          console.error("Error fetching user data", error);
          dispatch(
            setAuthState({
              isAuthenticated: false,
              user: {
                reputation: 0,
                role_id: 0,
                user_id: 0,
                username: "",
                is_banned: false,
              },
            }),
          );
        }
      };

      fetchUserData();
    } else {
      dispatch(
        setAuthState({
          isAuthenticated: false,
          user: {
            reputation: 0,
            role_id: 0,
            user_id: 0,
            username: "",
            is_banned: false,
          },
        }),
      );
    }
  }, [dispatch]);
};
