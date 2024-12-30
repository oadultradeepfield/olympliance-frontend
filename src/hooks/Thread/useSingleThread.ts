import { useState, useEffect } from "react";
import axios from "axios";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { apiUrl } from "../../data/apiUrl";

export interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

export const useSingleThread = (
  threadId: number,
): {
  thread: (ThreadData & { user?: UserInfo }) | null;
  loading: boolean;
  setThread: React.Dispatch<
    React.SetStateAction<(ThreadData & { user?: UserInfo }) | null>
  >;
} => {
  const [thread, setThread] = useState<
    (ThreadData & { user?: UserInfo }) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        setLoading(true);
        const threadResponse = await axios.get(
          `${apiUrl}/api/threads/${threadId}`,
        );

        const threadData: ThreadData = threadResponse.data.thread;

        const userResponse = await axios.get(
          `${apiUrl}/api/userinfo?id=${threadData.user_id}`,
        );

        const user: UserInfo = userResponse.data;

        setThread({ ...threadData, user });
      } catch (error: any) {
        console.error("Error fetching thread:", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    if (threadId) fetchThread();
  }, [threadId]);

  return { thread, loading, setThread };
};
