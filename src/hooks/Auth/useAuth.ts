import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token"),
  );
  const [user, setUser] = useState({
    reputation: 0,
    roleId: 0,
    userId: 0,
    username: "",
  });
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios
        .get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setUser({
            username: data.username,
            userId: data.user_id,
            roleId: data.role_id,
            reputation: data.reputation,
          });
          setIsUserDataLoaded(true);
        })
        .catch(() => setIsUserDataLoaded(true));
    } else {
      setIsUserDataLoaded(true);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser({
      reputation: 0,
      roleId: 0,
      userId: 0,
      username: "",
    });
    window.location.reload();
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    user,
    isUserDataLoaded,
    handleLogout,
  };
};
