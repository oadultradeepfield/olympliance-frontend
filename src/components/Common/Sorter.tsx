interface SorterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: { value: string; label: string }[];
}

const Sorter: React.FC<SorterProps> = ({
  sortBy,
  onSortChange,
  sortOptions,
}) => (
  <div className="mb-8 flex items-center justify-between">
    <select
      className="select select-bordered mx-auto max-w-xs"
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const CommentSorter: React.FC<{
  sortBy: string;
  onSortChange: (value: string) => void;
}> = ({ sortBy, onSortChange }) => {
  const COMMENT_SORT_OPTIONS = [
    { value: "oldest", label: "Oldest" },
    { value: "upvotes", label: "Top Upvoted" },
  ];

  return (
    <Sorter
      sortBy={sortBy}
      onSortChange={onSortChange}
      sortOptions={COMMENT_SORT_OPTIONS}
    />
  );
};

export const ThreadSorter: React.FC<{
  sortBy: string;
  onSortChange: (value: string) => void;
}> = ({ sortBy, onSortChange }) => {
  const THREAD_SORT_OPTIONS = [
    { value: "upvotes", label: "Top Upvoted" },
    { value: "comments", label: "Most Commented" },
    { value: "created_at", label: "Newest" },
    { value: "updated_at", label: "Recently Updated" },
  ];

  return (
    <Sorter
      sortBy={sortBy}
      onSortChange={onSortChange}
      sortOptions={THREAD_SORT_OPTIONS}
    />
  );
};

export default Sorter;
