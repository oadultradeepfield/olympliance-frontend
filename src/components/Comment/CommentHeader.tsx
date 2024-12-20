import { CommentSorter } from "../Common/Sorter";

interface CommentHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-semibold">Comments</div>
      <CommentSorter sortBy={sortBy} onSortChange={setSortBy} />
    </div>
  );
};

export default CommentHeader;
