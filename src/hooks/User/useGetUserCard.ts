import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { UserInfo } from "../../data/userData";

export const useGetUserCard = (username: string) => {
  const [userCard, setUserCard] = useState<UserInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserCard = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${apiUrl}/api/userinfo?username=${username}`,
          { withCredentials: false },
        );
        setUserCard(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching user card:", err.response.data.error);
        setLoading(false);
      }
    };

    fetchUserCard();
  }, []);

  return { userCard, loading };
};
