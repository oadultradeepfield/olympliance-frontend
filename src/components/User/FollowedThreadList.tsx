import { useState } from "react";
import { ThreadSorter } from "../../components/Common/Sorter";
import { ThreadCard } from "../../components/Category/ThreadCard";
import Pagination from "../../components/Common/Pagination";
import Loading from "../../components/Common/Loading";
import { useThreads } from "../../hooks/Thread/useThreads";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { categories } from "../../data/categoriesData";

const FollowedThreadList: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [page, setPage] = useState<number>(1);

  const { threads, loading } = useThreads({
    apiEndpoint: `/api/followed-threads/${userId}`,
    sort_by: sortBy,
    page: page,
    per_page: 10,
    useCredentials: true,
  });

  const getCategoryTitleById = (id: number) => {
    const category = categories.find((category) => category.id === id);
    return category!.title;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <ThreadSorter sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <Loading />}

      {!loading && threads.length === 0 && (
        <div className="text-center text-base-content/50">
          No followed threads found.
        </div>
      )}

      {!loading &&
        threads.map((thread) => (
          <ThreadCard
            key={thread.thread_id}
            thread={thread}
            categoryTitle={getCategoryTitleById(thread.category_id)}
          />
        ))}

      <Pagination
        page={page}
        hasMore={threads.length > 10}
        onPageChange={setPage}
      />
    </div>
  );
};

export default FollowedThreadList;
