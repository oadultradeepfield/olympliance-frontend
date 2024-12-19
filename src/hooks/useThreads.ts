import { useState, useEffect } from "react";
import axios from "axios";
import { ThreadData } from "../data/threadData";
import { UserInfo } from "../data/userData";

interface UseThreadsProps {
  apiEndpoint: string;
  params: { sort_by: string; page: number; per_page: number };
  token?: string;
}

export const useThreads = ({ apiEndpoint, params, token }: UseThreadsProps) => {
  const [threads, setThreads] = useState<(ThreadData & { user?: UserInfo })[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const threadsResponse = await axios.get(`${apiUrl}${apiEndpoint}`, {
          params,
          headers,
        });

        const threads = Array.isArray(threadsResponse.data.threads)
          ? threadsResponse.data.threads
          : [];

        const threadsWithUsers = await Promise.all(
          threads.map(async (thread: ThreadData) => {
            const userResponse = await axios.get(
              `${apiUrl}/api/users/${thread.user_id}`,
            );
            return { ...thread, user: userResponse.data };
          }),
        );

        setThreads(threadsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching threads:", error);
        setLoading(false);
      }
    };

    fetchThreads();
  }, [apiEndpoint, token]);

  return { threads, loading };
};
