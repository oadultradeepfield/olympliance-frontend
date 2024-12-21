import { useState } from "react";
import { ThreadSorter } from "../Common/Sorter";
import { ThreadCard } from "./ThreadCard";
import Pagination from "../Common/Pagination";
import Loading from "../Common/Loading";
import { useThreads } from "../../hooks/Thread/useThreads";
import ThreadSearchbar from "./ThreadSearchbar";
import { filterThreads } from "../../utils/filterThreads";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { threads, loading } = useThreads({
    apiEndpoint: `/api/threads/category/${categoryId}`,
    sort_by: sortBy,
    page: page,
    per_page: 10,
  });

  const filteredThreads = filterThreads(threads, searchTerm);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex flex-grow flex-col items-center justify-center gap-4 sm:flex-row">
        <ThreadSearchbar onSearchChange={setSearchTerm} />
        <ThreadSorter sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <Loading />}

      {!loading && filteredThreads.length === 0 && searchTerm ? (
        <div className="text-center text-base-content/50">
          No threads found matching "{searchTerm}".
        </div>
      ) : (
        !loading &&
        filteredThreads.length === 0 && (
          <div className="text-center text-base-content/50">
            No threads found in this category.
          </div>
        )
      )}

      {!loading &&
        filteredThreads.map((thread) => (
          <ThreadCard
            key={thread.thread_id}
            thread={thread}
            categoryTitle={categoryTitle}
          />
        ))}

      <Pagination
        page={page}
        hasMore={threads.length === 10}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ThreadList;
