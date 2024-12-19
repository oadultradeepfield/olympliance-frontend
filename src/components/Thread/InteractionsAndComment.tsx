import InteractionButton from "./InteractionButton";
import { InteractionState } from "../../data/interactionData";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import CommentButton from "./CommentButton";

interface InteractionsAndCommentProps {
  interactions: InteractionState;
  isAuthenticated: boolean;
  thread: (ThreadData & { user?: UserInfo }) | null;
  apiUrl: string;
  setThread: React.Dispatch<
    React.SetStateAction<(ThreadData & { user?: UserInfo }) | null>
  >;
  setInteractions: React.Dispatch<React.SetStateAction<InteractionState>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
}

const InteractionsAndComment: React.FC<InteractionsAndCommentProps> = ({
  interactions,
  isAuthenticated,
  thread,
  apiUrl,
  setThread,
  setInteractions,
  setShouldRefetchInteractions,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <InteractionButton
        interaction_type="upvote"
        interactions={interactions}
        isAuthenticated={isAuthenticated}
        thread={thread}
        apiUrl={apiUrl}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <InteractionButton
        interaction_type="downvote"
        interactions={interactions}
        isAuthenticated={isAuthenticated}
        thread={thread}
        apiUrl={apiUrl}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <InteractionButton
        interaction_type="follow"
        interactions={interactions}
        isAuthenticated={isAuthenticated}
        thread={thread}
        apiUrl={apiUrl}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <CommentButton
        isAuthenticated={isAuthenticated}
        thread={thread}
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default InteractionsAndComment;
