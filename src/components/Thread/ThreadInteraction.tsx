import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getBadge } from "../../utils/getBadge";
import { useSingleThread } from "../../hooks/Thread/useSingleThread";
import useInteractions from "../../hooks/Thread/useInteractions";
import ThreadContent from "./ThreadContent";
import Loading from "../Common/Loading";
import InteractionsAndComment from "./InteractionsAndComment";

interface ThreadInteractionProps {
  threadId: number;
  category: string;
}

const ThreadInteraction: React.FC<ThreadInteractionProps> = ({
  threadId,
  category,
}) => {
  const [shouldRefetchInteractions, setShouldRefetchInteractions] =
    useState<boolean>(false);
  const { thread, loading, setThread } = useSingleThread(threadId);
  const { interactions, setInteractions } = useInteractions(
    threadId,
    shouldRefetchInteractions,
  );

  if (loading) {
    return <Loading />;
  }

  if (!thread) {
    return <Navigate to="/not-found" />;
  }

  const badge = thread.user ? getBadge(thread.user.reputation) : null;

  return (
    <>
      <ThreadContent thread={thread} category={category} badge={badge} />
      <InteractionsAndComment
        interactions={interactions}
        setInteractions={setInteractions}
        thread={thread}
        setThread={setThread}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
    </>
  );
};

export default ThreadInteraction;
