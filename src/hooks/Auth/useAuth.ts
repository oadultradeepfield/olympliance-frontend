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
    const access_token = localStorage.getItem("access_token");

    const fetchUserData = async () => {
      if (access_token) {
        try {
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
          dispatch(setUserDataLoaded(true));
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
              },
            }),
          );
          dispatch(setUserDataLoaded(true));
        }
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
        dispatch(setUserDataLoaded(true));
      }
    };

    fetchUserData();
  }, [dispatch, isAuthenticated]);
};
