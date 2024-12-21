import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";
import { Leaderboard } from "../../data/leaderboardData";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${apiUrl}/api/leaderboard`);
        console.log(response);
        if (Array.isArray(response.data.leaderboard)) {
          setLeaderboard(response.data.leaderboard);
        } else {
          throw new Error("Invalid response format");
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading };
};
