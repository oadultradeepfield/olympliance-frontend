import { useState } from "react";
import CommentCard from "./CommentCard";
import Loading from "../Common/Loading";
import Pagination from "../Common/Pagination";
import { useComments } from "../../hooks/Comment/useComments";
import CommentHeader from "./CommentHeader";

interface ThreadCommentProps {
  threadId: number;
}

const ThreadComment: React.FC<ThreadCommentProps> = ({ threadId }) => {
  const [sortBy, setSortBy] = useState<string>("upvotes");
  const [page, setPage] = useState<number>(1);
  const [shouldRefetchInteractions, setShouldRefetchInteractions] =
    useState<boolean>(false);
  const [shouldShowLoading, setShouldShowLoading] = useState<boolean>(true);

  const {
    comments,
    parentCommentMap,
    userInteractions,
    setUserInteractions,
    loading,
  } = useComments(
    threadId,
    sortBy,
    page,
    shouldRefetchInteractions,
    shouldShowLoading,
  );

  return (
    <div className="container mx-auto mb-4">
      <CommentHeader sortBy={sortBy} setSortBy={setSortBy} />

      {loading && <Loading />}

      {!loading && comments.length === 0 && (
        <div className="text-center text-base-content/50">
          No comments found for this thread. Be the first one to start the
          conversation.
        </div>
      )}

      {!loading &&
        comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            threadId={threadId}
            reputation={comment?.user?.reputation ?? 0}
            comment={comment}
            parentComment={parentCommentMap[comment.parent_comment_id]}
            setShouldShowLoading={setShouldShowLoading}
            setShouldRefetchInteractions={setShouldRefetchInteractions}
            userInteractions={userInteractions}
            setUserInteractions={setUserInteractions}
          />
        ))}

      <Pagination
        page={page}
        hasMore={comments.length > 10}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ThreadComment;
