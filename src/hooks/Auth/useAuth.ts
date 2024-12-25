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

  const fetchUserData = async (access_token: string) => {
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
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const googleToken = urlParams.get("access_token");

      if (googleToken) {
        localStorage.setItem("access_token", googleToken);
        await fetchUserData(googleToken);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        return;
      }

      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        await fetchUserData(storedToken);
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

    handleAuthentication();
  }, [dispatch, isAuthenticated]);

  return { isAuthenticated };
};
