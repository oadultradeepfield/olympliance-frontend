import {
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { InteractionState } from "../../data/interactionData";
import { useNavigate } from "react-router-dom";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { useInteractionButton } from "../../hooks/Thread/useInteractionButton";

interface InteractionButtonProps {
  interaction_type: "upvote" | "downvote" | "follow";
  interactions: InteractionState;
  isAuthenticated: boolean;
  thread: (ThreadData & { user?: UserInfo }) | null;
  setThread: React.Dispatch<
    React.SetStateAction<(ThreadData & { user?: UserInfo }) | null>
  >;
  setInteractions: React.Dispatch<React.SetStateAction<InteractionState>>;
  setShouldRefetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
}

const InteractionButton: React.FC<InteractionButtonProps> = ({
  interaction_type,
  interactions,
  isAuthenticated,
  thread,
  setThread,
  setInteractions,
  setShouldRefetchInteractions,
}) => {
  const { handleInteraction } = useInteractionButton(
    thread?.thread_id || 0,
    interactions,
    setThread,
    setInteractions,
    setShouldRefetchInteractions,
  );

  const navigate = useNavigate();

  const interactionConfig = {
    upvote: {
      tooltip: "Upvote if you think the question is clear",
      icon: <ArrowUpIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />,
      buttonClass: "btn-success",
      statValue: thread?.stats.upvotes,
    },
    downvote: {
      tooltip: "Downvote if you think the question is unclear",
      icon: <ArrowDownIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />,
      buttonClass: "btn-error",
      statValue: thread?.stats.downvotes,
    },
    follow: {
      tooltip: "Follow if you have similar problems",
      icon: <PlusIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />,
      buttonClass: "btn-secondary",
      statValue: thread?.stats.followers,
    },
  };

  const { tooltip, icon, buttonClass, statValue } =
    interactionConfig[interaction_type];

  return (
    <div className="tooltip tooltip-top" data-tip={tooltip}>
      <button
        className={`btn btn-sm flex items-center ${buttonClass} ${
          !interactions[interaction_type].active ? "btn-outline" : ""
        }`}
        onClick={
          isAuthenticated
            ? () => handleInteraction(interaction_type)
            : () => navigate("/login")
        }
      >
        {icon}
        {statValue}
      </button>
    </div>
  );
};

export default InteractionButton;
