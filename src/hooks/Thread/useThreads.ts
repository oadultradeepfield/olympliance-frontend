import { useState, useEffect } from "react";
import axios from "axios";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { apiUrl } from "../../data/apiUrl";

interface UseThreadsProps {
  apiEndpoint: string;
  sort_by: string;
  page: number;
  per_page: number;
}

export const useThreads = ({
  apiEndpoint,
  sort_by,
  page,
  per_page,
}: UseThreadsProps) => {
  const [threads, setThreads] = useState<(ThreadData & { user?: UserInfo })[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);

        const threadsResponse = await axios.get(`${apiUrl}${apiEndpoint}`, {
          params: { sort_by, page, per_page },
        });

        const threads = Array.isArray(threadsResponse.data.threads)
          ? threadsResponse.data.threads
          : [];

        const threadsWithUsers = await Promise.all(
          threads.map(async (thread: ThreadData) => {
            const userResponse = await axios.get(
              `${apiUrl}/api/userinfo?id=${thread.user_id}`,
              { withCredentials: false },
            );
            return { ...thread, user: userResponse.data };
          }),
        );

        setThreads(threadsWithUsers);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching threads:", error.response.data.error);
        setLoading(false);
      }
    };

    fetchThreads();
  }, [apiEndpoint, sort_by, page, per_page]);

  return { threads, loading };
};
