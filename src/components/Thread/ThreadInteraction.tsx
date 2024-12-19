import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowUpIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowDownIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Navigate, useNavigate } from "react-router-dom";

interface ThreadInteractionProps {
  threadId: number;
  category: string;
  isAuthenticated: boolean;
  roleId: number;
  userId: number;
}

interface UserInfo {
  user_id: number;
  username: string;
  reputation: number;
  role_id: number;
  is_banned: boolean;
}

interface ThreadData {
  thread_id: number;
  user_id: number;
  title: string;
  content: string;
  stats: {
    followers: number;
    upvotes: number;
    downvotes: number;
    comments: number;
  };
  created_at: string;
  updated_at: string;
  tags: string[];
}

interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

interface CommentFormData {
  comment: string;
}

interface Interaction {
  interaction_id: number;
  thread_id: number;
  interaction_type: string;
}

interface InteractionState {
  upvote: {
    active: boolean;
    id?: number;
  };
  downvote: {
    active: boolean;
    id?: number;
  };
  follow: {
    active: boolean;
    id?: number;
  };
}

const getBadgeImage = (reputation: number) => {
  if (reputation >= 3500) return "Grandmaster";
  if (reputation >= 2000) return "Master";
  if (reputation >= 800) return "Candidate Master";
  if (reputation >= 400) return "Expert";
  if (reputation >= 100) return "Specialist";
  if (reputation >= 50) return "Apprentice";
  if (reputation >= 15) return "Pupil";
  return "Novice";
};

const ThreadInteraction: React.FC<ThreadInteractionProps> = ({
  threadId,
  category,
  isAuthenticated,
  roleId,
  userId,
}) => {
  const [thread, setThread] = useState<
    (ThreadData & { user?: UserInfo }) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [interactions, setInteractions] = useState<InteractionState>({
    upvote: { active: false, id: 0 },
    downvote: { active: false, id: 0 },
    follow: { active: false, id: 0 },
  });
  const [formData, setFormData] = useState<ThreadFormData>({
    title: "",
    content: "",
    tags: "",
  });
  const [commentFormData, setCommentFormData] = useState<CommentFormData>({
    comment: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [shouldRefetchInteractions, setShouldRefetchInteractions] =
    useState<boolean>(false);

  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        setLoading(true);
        const threadResponse = await axios.get(
          `${apiUrl}/api/threads/${threadId}`,
        );

        const userResponse = await axios.get(
          `${apiUrl}/api/users/${threadResponse.data.thread.user_id}`,
        );

        const threadData = threadResponse.data.thread;
        setThread({
          ...threadData,
          user: userResponse.data,
        });

        setFormData({
          title: threadData.title,
          content: threadData.content,
          tags: threadData.tags.join(", "),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching thread:", error);
        setLoading(false);
      }
    };
    fetchThread();
  }, [threadId]);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await axios.get<{ interactions: Interaction[] }>(
          `${apiUrl}/api/interactions?thread_id=${threadId}&user_id=${userId}`,
          {},
        );

        const existingInteractions = response.data.interactions;
        const interactionState: InteractionState = {
          upvote: { active: false, id: 0 },
          downvote: { active: false, id: 0 },
          follow: { active: false, id: 0 },
        };

        existingInteractions.forEach((interaction) => {
          switch (interaction.interaction_type) {
            case "upvote":
              interactionState.upvote = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
            case "downvote":
              interactionState.downvote = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
            case "follow":
              interactionState.follow = {
                active: true,
                id: interaction.interaction_id,
              };
              break;
          }
        });
        setInteractions(interactionState);
      } catch (error) {
        console.error("Error fetching interactions:", error);
      }
    };

    fetchInteractions();
  }, [threadId, shouldRefetchInteractions]);

  const handleInteraction = async (type: keyof InteractionState) => {
    try {
      const token = localStorage.getItem("token");
      const currentInteraction = interactions[type];

      if (currentInteraction.active && currentInteraction.id) {
        await axios.put(
          `${apiUrl}/api/interactions/${currentInteraction.id}`,
          { interaction_type: type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setInteractions((prev) => ({
          ...prev,
          [type]: { active: false, id: 0 },
        }));

        setThread((prev) => {
          if (!prev) return null;
          const newStats = { ...prev.stats };
          if (type === "upvote") newStats.upvotes -= 1;
          if (type === "downvote") newStats.downvotes -= 1;
          if (type === "follow") newStats.followers -= 1;
          return { ...prev, stats: newStats };
        });
      } else {
        if (type === "upvote" || type === "downvote") {
          const oppositeType = type === "upvote" ? "downvote" : "upvote";
          const oppositeInteraction = interactions[oppositeType];

          if (oppositeInteraction.active && oppositeInteraction.id) {
            await axios.put(
              `${apiUrl}/api/interactions/${oppositeInteraction.id}`,
              { interaction_type: oppositeType },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
          }
        }

        const response = await axios.post(
          `${apiUrl}/api/interactions`,
          {
            thread_id: threadId,
            interaction_type: type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setInteractions((prev) => {
          const newState = { ...prev };

          if (type === "upvote" || type === "downvote") {
            const oppositeType = type === "upvote" ? "downvote" : "upvote";
            newState[oppositeType] = { active: false, id: undefined };
          }

          newState[type] = {
            active: true,
            id: response.data.interaction_id,
          };

          return newState;
        });

        setThread((prev) => {
          if (!prev) return null;
          const newStats = { ...prev.stats };

          if (type === "upvote") {
            newStats.upvotes += 1;
            if (interactions.downvote.active) newStats.downvotes -= 1;
          }
          if (type === "downvote") {
            newStats.downvotes += 1;
            if (interactions.upvote.active) newStats.upvotes -= 1;
          }
          if (type === "follow") newStats.followers += 1;

          return { ...prev, stats: newStats };
        });
      }
      setShouldRefetchInteractions((prev) => !prev);
    } catch (error) {
      console.error(`Error with ${type} interaction:`, error);
    }
  };

  const getRoleBadge = (user?: UserInfo) => {
    switch (user?.role_id) {
      case 1:
        return (
          <div className="badge badge-secondary mr-2 items-center text-xs">
            <ShieldCheckIcon className="mr-1 h-3 w-3" /> Moderator
          </div>
        );
      case 2:
        return (
          <div className="badge badge-success mr-2 items-center text-xs">
            <StarIcon className="mr-1 h-3 w-3" /> Admin
          </div>
        );
      default:
        return null;
    }
  };

  const handleComment = async (threadId: number, content: string) => {
    try {
      const token = localStorage.getItem("token");
      const newComment = {
        thread_id: threadId,
        content: content,
      };

      const response = await axios.post(`${apiUrl}/api/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An unkown error occurred while posting the comment. Please try again.";
      setError(errorMessage);
    }
  };

  const handleEditThread = async (
    threadId: number,
    title: string,
    content: string,
    tags: string[],
  ) => {
    try {
      const token = localStorage.getItem("token");
      const newThread = {
        title,
        content,
        tags,
      };

      const response = await axios.put(
        `${apiUrl}/api/threads/${threadId}`,
        newThread,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while updating the thread. Please try again.";
      setError(errorMessage);
    }
  };

  const handleDeleteThread = async (threadId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiUrl}/api/threads/${threadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate(`/${category}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An error occurred while deleting the thread. Please try again.";
      setError(errorMessage);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChangeComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCommentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-spinner loading-lg text-base-content/75"></span>
      </div>
    );
  }

  if (!thread) {
    return <Navigate to="/not-found" />;
  }

  const badge = thread.user ? getBadgeImage(thread.user.reputation) : null;

  return (
    <div className="px-6 pt-6">
      <div className="mb-2 flex items-center">
        <div className="mr-2 text-3xl font-bold">{thread.title}</div>
        {userId === thread.user?.user_id && (
          <>
            <button
              className="p-2"
              onClick={() =>
                (
                  document.getElementById("edit_modal") as HTMLDialogElement
                ).showModal()
              }
            >
              <PencilIcon className="h-6 w-6 text-base-content hover:text-success" />
            </button>
            <dialog id="edit_modal" className="modal">
              <div className="modal-box min-w-96 max-w-3xl p-8 md:w-full">
                <h2 className="mb-4 text-2xl font-bold">Edit Thread</h2>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleEditThread(
                      thread.thread_id,
                      formData.title,
                      formData.content,
                      formData.tags
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag !== ""),
                    );
                  }}
                  className="w-full"
                >
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Thread Title</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter your thread title"
                      className="input input-bordered w-full"
                      value={formData.title}
                      onChange={handleInputChange}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      name="content"
                      placeholder="Write your thread content here"
                      className="textarea textarea-bordered h-60 w-full resize-none text-base"
                      value={formData.content}
                      onChange={handleInputChange}
                      maxLength={5000}
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Tags (comma-separated)</span>
                      <span className="label-text-alt text-base-content/75">
                        Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      name="tags"
                      placeholder="e.g., science, research, theory"
                      className="input input-bordered w-full"
                      value={formData.tags}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error && (
                    <div className="mt-4 text-center text-sm text-error">
                      Error: {error}
                    </div>
                  )}
                  {success && (
                    <div className="mt-4 text-center text-sm text-success">
                      {success}
                    </div>
                  )}
                  <div className="modal-action">
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        (
                          document.getElementById(
                            "edit_modal",
                          ) as HTMLDialogElement
                        ).close()
                      }
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </>
        )}

        {(userId === thread.user?.user_id ||
          roleId > thread.user?.role_id!) && (
          <>
            <button
              className="p-2"
              onClick={() =>
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).showModal()
              }
            >
              <TrashIcon className="h-6 w-6 text-base-content hover:text-error" />
            </button>
            <dialog id="delete_modal" className="modal">
              <div className="modal-box w-96">
                <h3 className="text-lg font-bold">Confirm Deletion</h3>
                <p className="pt-4">
                  Are you sure you want to delete this thread? This action
                  cannot be undone.
                </p>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() =>
                      (
                        document.getElementById(
                          "delete_modal",
                        ) as HTMLDialogElement
                      ).close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      handleDeleteThread(thread.thread_id);
                      (
                        document.getElementById(
                          "delete_modal",
                        ) as HTMLDialogElement
                      ).close();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>
      <div className="mb-3 text-base text-base-content/75">
        <span>
          By {thread.user?.username}
          {badge && (
            <span className="ml-1 text-sm">
              ({badge}: {thread.user?.reputation})
            </span>
          )}
          <span className="-mr-2 ml-2">{getRoleBadge(thread.user)}</span>{" "}
          {" • "}
          {new Date(thread.created_at).toLocaleDateString()}
        </span>
      </div>

      {thread.tags.length > 0 && (
        <div className="tags-container mb-2 space-x-1">
          {thread.tags.map((tag, index) => (
            <div key={index} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="mb-6 max-w-none text-lg">{thread.content}</div>

      <div className="flex items-center space-x-4">
        <div
          className="tooltip tooltip-top"
          data-tip="Upvote if you think the question is clear"
        >
          <button
            className={`btn btn-success btn-sm flex items-center ${
              !interactions.upvote.active ? "btn-outline" : ""
            }`}
            onClick={
              isAuthenticated
                ? () => handleInteraction("upvote")
                : () => navigate("/login")
            }
          >
            <ArrowUpIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            {thread?.stats.upvotes}
          </button>
        </div>

        <div
          className="tooltip tooltip-top"
          data-tip="Downvote if you think the question is unclear"
        >
          <button
            className={`btn btn-error btn-sm flex items-center ${
              !interactions.downvote.active ? "btn-outline" : ""
            }`}
            onClick={
              isAuthenticated
                ? () => handleInteraction("downvote")
                : () => navigate("/login")
            }
          >
            <ArrowDownIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            {thread?.stats.downvotes}
          </button>
        </div>

        <div
          className="tooltip tooltip-top"
          data-tip="Follow if you have similar problems"
        >
          <button
            className={`btn btn-secondary btn-sm flex items-center ${
              !interactions.follow.active ? "btn-outline" : ""
            }`}
            onClick={
              isAuthenticated
                ? () => handleInteraction("follow")
                : () => navigate("/login")
            }
          >
            <PlusIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            {thread?.stats.followers}
          </button>
        </div>

        <div className="tooltip tooltip-top" data-tip="Leave a reply!">
          <button
            className="btn btn-outline btn-primary btn-sm flex items-center"
            onClick={
              isAuthenticated
                ? () => {
                    (
                      document.getElementById(
                        "comment_modal",
                      ) as HTMLDialogElement
                    ).showModal();
                  }
                : () => navigate("/login")
            }
          >
            <ChatBubbleLeftIcon className="mr-0 h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            {thread?.stats.comments}
          </button>
          <dialog id="comment_modal" className="modal">
            <div className="modal-box min-w-96 max-w-2xl p-8 md:w-full">
              <h2 className="mb-2 text-left text-2xl font-bold">
                You're replying to the thread:
              </h2>
              <p className="mb-2 text-left text-lg italic">{thread?.title}</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleComment(thread.thread_id, commentFormData.comment);
                }}
                className="w-full"
              >
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Comment</span>
                  </label>
                  <textarea
                    name="comment"
                    placeholder="Write your comment here"
                    className="textarea textarea-bordered h-60 w-full resize-none text-base"
                    value={commentFormData.comment}
                    onChange={handleInputChangeComment}
                    maxLength={5000}
                    required
                  />
                </div>
                {error && (
                  <div className="mt-4 text-center text-sm text-error">
                    Error: {error}
                  </div>
                )}
                {success && (
                  <div className="mt-4 text-center text-sm text-success">
                    {success}
                  </div>
                )}
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      (
                        document.getElementById(
                          "comment_modal",
                        ) as HTMLDialogElement
                      ).close()
                    }
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ThreadInteraction;
