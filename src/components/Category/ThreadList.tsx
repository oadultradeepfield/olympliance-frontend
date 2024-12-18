import { useState } from "react";
import { ThreadSorter } from "../Common/Sorter";
import { ThreadCard } from "./ThreadCard";
import Pagination from "../Common/Pagination";
import Loading from "../Common/Loading";
import { useThreads } from "../../hooks/Thread/useThreads";

interface ThreadListProps {
  categoryId: number;
  categoryTitle: string;
}

const ThreadList: React.FC<ThreadListProps> = ({
  categoryId,
  categoryTitle,
}) => {
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [page, setPage] = useState<number>(1);

  const { threads, loading } = useThreads({
    apiEndpoint: `/api/threads/category/${categoryId}`,
    sort_by: sortBy,
    page: page,
    per_page: 5,
  });

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
