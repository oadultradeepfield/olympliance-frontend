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
  isAuthenticated: boolean;
  roleId: number;
  userId: number;
}

const ThreadInteraction: React.FC<ThreadInteractionProps> = ({
  threadId,
  category,
  isAuthenticated,
  roleId,
  userId,
}) => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const [shouldRefetchInteractions, setShouldRefetchInteractions] =
    useState<boolean>(false);
  const { thread, loading, setThread } = useSingleThread(apiUrl, threadId);
  const { interactions, setInteractions } = useInteractions(
    apiUrl,
    threadId,
    userId,
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
      <ThreadContent
        userId={userId}
        roleId={roleId}
        thread={thread}
        apiUrl={apiUrl}
        category={category}
        badge={badge}
      />
      <InteractionsAndComment
        interactions={interactions}
        setInteractions={setInteractions}
        thread={thread}
        setThread={setThread}
        isAuthenticated={isAuthenticated}
        apiUrl={apiUrl}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
    </>
  );
};

export default ThreadInteraction;
