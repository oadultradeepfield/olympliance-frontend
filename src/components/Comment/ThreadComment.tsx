import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import grandmasterBadge from "../../assets/01_badges_grandmaster.png";
import masterBadge from "../../assets/02_badges_master.png";
import candidateMasterBadge from "../../assets/03_badges_candidate_master.png";
import expertBadge from "../../assets/04_badges_expert.png";
import specialistBadge from "../../assets/05_badges_specialist.png";
import apprenticeBadge from "../../assets/06_badges_apprentice.png";
import pupilBadge from "../../assets/07_badges_pupil.png";
import noviceBadge from "../../assets/08_badges_novice.png";
import { apiUrl } from "../../data/apiUrl";

const getBadgeImage = (reputation: number) => {
  if (reputation >= 3500)
    return { image: grandmasterBadge, title: "Grandmaster" };
  if (reputation >= 2000) return { image: masterBadge, title: "Master" };
  if (reputation >= 800)
    return { image: candidateMasterBadge, title: "Candidate Master" };
  if (reputation >= 400) return { image: expertBadge, title: "Expert" };
  if (reputation >= 100) return { image: specialistBadge, title: "Specialist" };
  if (reputation >= 50) return { image: apprenticeBadge, title: "Apprentice" };
  if (reputation >= 15) return { image: pupilBadge, title: "Pupil" };
  return { image: noviceBadge, title: "Novice" };
};

interface ThreadCommentProps {
  threadId: number;
  userId: number;
  roleId: number;
  isAuthenticated: boolean;
}

interface CommentData {
  comment_id: number;
  parent_comment_id: number;
  user_id: number;
  content: string;
  stats: {
    upvotes: number;
    downvotes: number;
  };
  created_at: string;
  is_deleted: boolean;
}

interface ReplyCommentFormData {
  comment: string;
}

interface UserInfo {
  user_id: number;
  username: string;
  reputation: number;
  role_id: number;
}

interface EditCommentFormData {
  comment_id: number;
  comment: string;
}

interface InteractionsInfo {
  interaction_id: number;
  user_id: number;
  comment_id: number;
  interaction_type: string;
}

const SORT_OPTIONS = [
  { value: "upvotes", label: "Top Upvoted" },
  { value: "created_at", label: "Oldest" },
];

const ThreadComment: React.FC<ThreadCommentProps> = ({
  threadId,
  userId,
  roleId,
  isAuthenticated,
}) => {
  const [comments, setComments] = useState<
    (CommentData & { user?: UserInfo; interactions?: InteractionsInfo[] })[]
  >([]);
  const [sortBy, setSortBy] = useState<string>("upvotes");
  const [page, setPage] = useState<number>(1);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [editCommentFormData, setEditCommentFormData] =
    useState<EditCommentFormData>({
      comment_id: 0,
      comment: "",
    });
  const [replyCommentFormData, setReplyCommentFormData] =
    useState<ReplyCommentFormData>({
      comment: "",
    });
  const navigate = useNavigate();
  const [parentCommentMap, setParentCommentMap] = useState<{
    [key: number]: CommentData;
  }>({});
  const [userInteractions, setUserInteractions] = useState<
    Record<number, { upvoted: boolean; downvoted: boolean }>
  >({});
  const [shouldRefetchInteractions, setShouldRefetchInteractions] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (isFirstLoad) {
          setLoading(true);
        }
        const commentsResponse = await axios.get(`${apiUrl}/api/comments`, {
          params: {
            thread_id: threadId,
            sort_by: sortBy,
            page,
            per_page: 10,
          },
        });

        const commentsWithUsersAndInteractions = await Promise.all(
          commentsResponse.data.comments.map(async (comment: CommentData) => {
            const userResponse = await axios.get(
              `${apiUrl}/api/users/${comment.user_id}`,
            );
            const interactionsResponse = await axios.get(
              `${apiUrl}/api/interactions`,
              {
                params: { comment_id: comment.comment_id, user_id: userId },
              },
            );

            const userUpvote = interactionsResponse.data.interactions.some(
              (interaction: InteractionsInfo) =>
                interaction.user_id === userId &&
                interaction.interaction_type === "upvote",
            );
            const userDownvote = interactionsResponse.data.interactions.some(
              (interaction: InteractionsInfo) =>
                interaction.user_id === userId &&
                interaction.interaction_type === "downvote",
            );

            return {
              ...comment,
              user: userResponse.data,
              interactions: interactionsResponse.data.interactions,
              userInteractions: {
                upvoted: userUpvote,
                downvoted: userDownvote,
              },
            };
          }),
        );

        const commentMap = commentsWithUsersAndInteractions.reduce(
          (acc, comment) => {
            acc[comment.comment_id] = comment;
            return acc;
          },
          {},
        );

        const updatedUserInteractions = commentsWithUsersAndInteractions.reduce(
          (acc, comment) => {
            acc[comment.comment_id] = comment.userInteractions;
            return acc;
          },
          {},
        );

        setParentCommentMap(commentMap);
        setComments(commentsWithUsersAndInteractions);
        setUserInteractions(updatedUserInteractions);

        if (isFirstLoad) {
          setIsFirstLoad(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };
    fetchComments();
  }, [threadId, sortBy, page, shouldRefetchInteractions, userId]);

  const handleVote = async (
    commentId: number,
    voteType: "upvote" | "downvote",
  ) => {
    try {
      const token = localStorage.getItem("token");
      const comment = comments.find((c) => c.comment_id === commentId);
      const currentInteractions = comment?.interactions;

      const existingInteraction = currentInteractions?.find(
        (interaction: any) => interaction.user_id === userId,
      );

      if (existingInteraction) {
        await axios.put(
          `${apiUrl}/api/interactions/${existingInteraction.interaction_id}`,
          { interaction_type: voteType },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          `${apiUrl}/api/interactions`,
          {
            comment_id: commentId,
            interaction_type: voteType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      setUserInteractions((prev) => ({
        ...prev,
        [commentId]: {
          upvoted: voteType === "upvote",
          downvoted: voteType === "downvote",
        },
      }));
      setShouldRefetchInteractions((prev) => !prev);
    } catch (error: any) {
      console.error("Error handling vote:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while voting. Please try again.";
      setError(errorMessage);
    }
  };

  const handleReplyComment = async (
    threadId: number,
    parentCommentId: number,
    content: string,
  ) => {
    try {
      const token = localStorage.getItem("token");
      const newComment = {
        thread_id: threadId,
        parent_comment_id: parentCommentId,
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

  const handleEditComment = async (commentId: number, comment: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/api/comments/${commentId}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(response.data.message);
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.comment_id === commentId ? { ...c, content: comment } : c,
        ),
      );

      setTimeout(() => {
        setSuccess("");
        (
          document.getElementById(
            `edit_comment_modal_${commentId}`,
          ) as HTMLDialogElement
        ).close();
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while updating the comment. Please try again.";
      setError(errorMessage);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${apiUrl}/api/comments/${commentId}`,
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
        error.response.data.error ||
        "An error occurred while deleting the comment. Please try again.";
      setError(errorMessage);
    }
  };

  const openEditModal = (comment: CommentData & { user?: UserInfo }) => {
    setEditCommentFormData({
      comment_id: comment.comment_id,
      comment: comment.content,
    });
    (
      document.getElementById(
        `edit_comment_modal_${comment.comment_id}`,
      ) as HTMLDialogElement
    ).showModal();
  };

  const handleEditCommentInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setEditCommentFormData((prev) => ({
      ...prev,
      comment: value,
    }));
  };

  const handleInputChangeReplyComment = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setReplyCommentFormData((prev) => ({
      ...prev,
      comment: value,
    }));
  };

  const renderCommentCard = (comment: CommentData & { user?: UserInfo }) => {
    const badge = comment.user ? getBadgeImage(comment.user.reputation) : null;
    const getRoleBadge = () => {
      switch (comment.user?.role_id) {
        case 1:
          return (
            <div className="badge badge-secondary mr-2 items-center text-xs font-semibold">
              <ShieldCheckIcon className="mr-1 h-3 w-3" /> Moderator
            </div>
          );
        case 2:
          return (
            <div className="badge badge-success mr-2 items-center text-xs font-semibold">
              <StarIcon className="mr-1 h-3 w-3" /> Admin
            </div>
          );
        default:
          return null;
      }
    };

    const parentComment = comment.parent_comment_id
      ? parentCommentMap[comment.parent_comment_id]
      : null;

    return (
      <div
        key={comment.comment_id}
        className="card mx-auto mb-3 flex w-full max-w-5xl border-2 bg-base-100 px-2 py-1"
      >
        <div className="card-body flex flex-row items-start p-3">
          {badge && (
            <div className="avatar mr-3 mt-1 shrink-0">
              <div className="bg-neutral-focus h-10 w-10 rounded-full text-neutral-content">
                <img
                  src={badge.image}
                  alt={`${badge.title} Badge`}
                  className="h-8 w-8"
                />
              </div>
            </div>
          )}
          <div className="flex flex-grow flex-col">
            {parentComment && (
              <div className="mb-2 bg-primary-content/25 p-2 text-sm italic text-base-content/75">
                <strong>Replied to: </strong>
                {parentComment.content?.length > 50
                  ? `\"${parentComment.content.slice(0, 50)}...\"`
                  : parentComment.is_deleted
                    ? "[Comment deleted]"
                    : `\"${parentComment.content}\"`}
              </div>
            )}
            <div className="mb-3 text-base">
              {getRoleBadge()}
              <span
                className={
                  comment.is_deleted ? "italic text-base-content/75" : ""
                }
              >
                {comment.is_deleted ? "[Comment deleted]" : comment.content}
              </span>
              {userId === comment.user?.user_id && !comment.is_deleted && (
                <>
                  <button
                    className="pl-3"
                    onClick={() => openEditModal(comment)}
                  >
                    <PencilIcon className="h-4 w-4 text-base-content hover:text-success" />
                  </button>
                  <dialog
                    id={`edit_comment_modal_${comment.comment_id}`}
                    className="modal"
                  >
                    <div className="modal-box min-w-96 max-w-3xl p-8 md:w-full">
                      <h2 className="mb-4 text-2xl font-bold">Edit Comment</h2>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleEditComment(
                            editCommentFormData.comment_id,
                            editCommentFormData.comment,
                          );
                        }}
                        className="w-full"
                      >
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Comment</span>
                          </label>
                          <textarea
                            name="content"
                            placeholder="Write your thread content here"
                            className="textarea textarea-bordered h-60 w-full resize-none text-base"
                            value={editCommentFormData.comment}
                            onChange={handleEditCommentInputChange}
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
                                  `edit_comment_modal_${comment.comment_id}`,
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
              {(userId === comment.user?.user_id ||
                roleId > comment.user?.role_id!) &&
                !comment.is_deleted && (
                  <>
                    <button
                      className="pl-2"
                      onClick={() =>
                        (
                          document.getElementById(
                            `delete_comment_modal_${comment.comment_id}`,
                          ) as HTMLDialogElement
                        ).showModal()
                      }
                    >
                      <TrashIcon className="h-4 w-4 text-base-content hover:text-error" />
                    </button>
                    <dialog
                      id={`delete_comment_modal_${comment.comment_id}`}
                      className="modal"
                    >
                      <div className="modal-box w-96">
                        <h3 className="text-lg font-bold">Confirm Deletion</h3>
                        <p className="pt-4">
                          Are you sure you want to delete this comment? This
                          action cannot be undone.
                        </p>
                        <div className="modal-action">
                          <button
                            className="btn"
                            onClick={() =>
                              (
                                document.getElementById(
                                  `delete_comment_modal_${comment.comment_id}`,
                                ) as HTMLDialogElement
                              ).close()
                            }
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-error"
                            onClick={() => {
                              console.log(
                                "Attempting to delete comment with ID:",
                                comment.comment_id,
                              );
                              console.log(
                                "Full comment object:",
                                comments.find(
                                  (c) => c.comment_id === comment.comment_id,
                                ),
                              );
                              handleDeleteComment(comment.comment_id);
                              (
                                document.getElementById(
                                  `delete_comment_modal_${comment.comment_id}`,
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
            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/75">
              {!comment.is_deleted && (
                <>
                  <button
                    onClick={
                      isAuthenticated
                        ? () => handleVote(comment.comment_id, "upvote")
                        : () => navigate("/login")
                    }
                    className={`btn btn-success btn-xs flex items-center ${userInteractions[comment.comment_id]?.upvoted ? "" : "btn-outline"}`}
                  >
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                    {comment.stats.upvotes}
                  </button>
                  <button
                    onClick={
                      isAuthenticated
                        ? () => handleVote(comment.comment_id, "downvote")
                        : () => navigate("/login")
                    }
                    className={`btn btn-error btn-xs flex items-center ${userInteractions[comment.comment_id]?.downvoted ? "" : "btn-outline"}`}
                  >
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                    {comment.stats.downvotes}
                  </button>
                  <button
                    onClick={
                      isAuthenticated
                        ? () => {
                            (
                              document.getElementById(
                                `reply_comment_modal_${comment.comment_id}`,
                              ) as HTMLDialogElement
                            ).showModal();
                          }
                        : () => navigate("/login")
                    }
                    className="btn btn-outline btn-primary btn-xs flex items-center"
                  >
                    <ChatBubbleLeftIcon className="h-3 w-3" />
                    {"Reply"}
                  </button>
                  <dialog
                    id={`reply_comment_modal_${comment.comment_id}`}
                    className="modal"
                  >
                    <div className="modal-box min-w-96 max-w-2xl p-8 text-base-content md:w-full">
                      <h2 className="mb-2 text-2xl font-bold">
                        You're replying to the comment:
                      </h2>
                      <p className="mb-2 text-lg italic text-base-content/75">
                        "{comment?.content}"
                      </p>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleReplyComment(
                            threadId,
                            comment.comment_id,
                            replyCommentFormData.comment,
                          );
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
                            value={replyCommentFormData.comment}
                            onChange={handleInputChangeReplyComment}
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
                                  `reply_comment_modal_${comment.comment_id}`,
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
                </>
              )}
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>
                  Author: {comment.user?.username}
                  {badge && (
                    <span className="ml-1 text-xs">
                      ({badge.title}: {comment.user?.reputation})
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Comments</div>
        <select
          className="select select-bordered max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-base-content/75"></span>
        </div>
      )}

      {!loading && comments.length === 0 && (
        <div className="text-center text-base-content/50">
          No comments found for this thread. Be the first one to start the
          conversation.
        </div>
      )}

      {!loading && comments.map(renderCommentCard)}

      <div className="mb-8 mt-12 flex justify-center">
        <div className="join">
          <button
            className="btn join-item"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            «
          </button>
          <button className="btn join-item pointer-events-none">
            Page {page}
          </button>
          <button
            className="btn join-item"
            disabled={comments.length < 10}
            onClick={() => setPage(page + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadComment;
