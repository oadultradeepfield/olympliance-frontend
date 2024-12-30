import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { setAuthState, setUserDataLoaded } from "../../slices/authSlice";
import { apiUrl } from "../../data/apiUrl";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const userResponse = await axios.get(`${apiUrl}/api/users`, {
          withCredentials: true,
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
              is_deleted: userResponse.data.is_deleted,
              created_at: userResponse.data.created_at,
            },
          }),
        );
      } catch (error) {
        dispatch(
          setAuthState({
            isAuthenticated: false,
            user: {
              reputation: 0,
              role_id: 0,
              user_id: 0,
              username: "",
              is_banned: false,
              is_deleted: false,
              created_at: "",
            },
          }),
        );
      } finally {
        dispatch(setUserDataLoaded(true));
      }
    };

    handleAuthentication();
  }, [dispatch, isAuthenticated]);

  return { isAuthenticated };
};
