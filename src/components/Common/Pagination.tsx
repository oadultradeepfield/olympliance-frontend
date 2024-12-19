interface PaginationProps {
  page: number;
  hasMore: boolean;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  hasMore,
  onPageChange,
}) => (
  <div className="mb-8 mt-12 flex justify-center">
    <div className="join">
      <button
        className="btn join-item"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        «
      </button>
      <button className="btn join-item pointer-events-none">Page {page}</button>
      <button
        className="btn join-item"
        disabled={!hasMore}
        onClick={() => onPageChange(page + 1)}
      >
        »
      </button>
    </div>
  </div>
);

export default Pagination;
