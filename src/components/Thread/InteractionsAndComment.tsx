import InteractionButton from "./InteractionButton";
import { InteractionState } from "../../data/interactionData";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import CommentButton from "./CommentButton";

interface InteractionsAndCommentProps {
  interactions: InteractionState;
  thread: (ThreadData & { user?: UserInfo }) | null;
  setThread: React.Dispatch<
    React.SetStateAction<(ThreadData & { user?: UserInfo }) | null>
  >;
  setInteractions: React.Dispatch<React.SetStateAction<InteractionState>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
}

const InteractionsAndComment: React.FC<InteractionsAndCommentProps> = ({
  interactions,
  thread,
  setThread,
  setInteractions,
  setShouldRefetchInteractions,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <InteractionButton
        interaction_type="upvote"
        interactions={interactions}
        thread={thread}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <InteractionButton
        interaction_type="downvote"
        interactions={interactions}
        thread={thread}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <InteractionButton
        interaction_type="follow"
        interactions={interactions}
        thread={thread}
        setThread={setThread}
        setInteractions={setInteractions}
        setShouldRefetchInteractions={setShouldRefetchInteractions}
      />
      <CommentButton thread={thread} />
    </div>
  );
};

export default InteractionsAndComment;
