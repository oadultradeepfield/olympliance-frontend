import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { ThreadSorter } from "../Common/Sorter";
import { ThreadCard } from "./ThreadCard";
import Pagination from "../Common/Pagination";
import Loading from "../Common/Loading";

interface ThreadListProps {
  categoryId: number;
  categoryTitle: string;
}

const ThreadList: React.FC<ThreadListProps> = ({
  categoryId,
  categoryTitle,
}) => {
  const [threads, setThreads] = useState<(ThreadData & { user?: UserInfo })[]>(
    [],
  );
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const threadsResponse = await axios.get(
          `${apiUrl}/api/threads/category/${categoryId}`,
          {
            params: {
              sort_by: sortBy,
              page: page,
              per_page: 5,
            },
          },
        );

        const threadsWithUsers = await Promise.all(
          threadsResponse.data.threads.map(async (thread: ThreadData) => {
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
  }, [categoryId, sortBy, page]);

  return (
    <div className="container mx-auto px-4 py-6">
      <ThreadSorter sortBy={sortBy} onSortChange={setSortBy} />

      {loading && <Loading />}

      {!loading && threads.length === 0 && (
        <div className="text-center text-base-content/50">
          No threads found in this category.
        </div>
      )}

      {!loading &&
        threads.map((thread) => (
          <ThreadCard
            key={thread.thread_id}
            thread={thread}
            categoryTitle={categoryTitle}
          />
        ))}

      <Pagination
        page={page}
        hasMore={threads.length === 5}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ThreadList;
