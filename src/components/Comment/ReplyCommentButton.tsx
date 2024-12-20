import { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useReplyComment } from "../../hooks/Comment/useReplyComment";
import { MessageDisplay } from "../Common/MessageDisplay";

interface CommentReplyButtonProps {
  threadId: number;
  parentCommentId: number;
  content: string;
  isAuthenticated: boolean;
}

const CommentReplyButton: React.FC<CommentReplyButtonProps> = ({
  threadId,
  parentCommentId,
  content,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const { replyComment } = useReplyComment();
  const [replyCommentFormData, setReplyCommentFormData] = useState({
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChangeReplyComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyCommentFormData({
      ...replyCommentFormData,
      comment: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!replyCommentFormData.comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    replyComment(threadId, parentCommentId, replyCommentFormData.comment)
      .then(() => {
        setSuccess("Your comment has been posted!");
        setReplyCommentFormData({ comment: "" });
        (
          document.getElementById(
            `reply_comment_modal_${parentCommentId}`,
          ) as HTMLDialogElement
        ).close();
      })
      .catch(() => {
        setError("Failed to post your comment.");
      });
  };

  const handleOpenModal = () => {
    if (isAuthenticated) {
      (
        document.getElementById(
          `reply_comment_modal_${parentCommentId}`,
        ) as HTMLDialogElement
      ).showModal();
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    (
      document.getElementById(
        `reply_comment_modal_${parentCommentId}`,
      ) as HTMLDialogElement
    ).close();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-outline btn-primary btn-xs flex items-center"
      >
        <ChatBubbleLeftIcon className="h-3 w-3" />
        {"Reply"}
      </button>
      <dialog id={`reply_comment_modal_${parentCommentId}`} className="modal">
        <div className="modal-box min-w-96 max-w-2xl p-8 text-base-content md:w-full">
          <h2 className="mb-2 text-2xl font-bold">
            You're replying to the comment:
          </h2>
          <p className="mb-2 text-lg italic text-base-content/75">
            "{content}"
          </p>
          <form onSubmit={handleSubmit} className="w-full">
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

            {error && <MessageDisplay message={error} type="error" />}
            {success && <MessageDisplay message={success} type="success" />}

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleCloseModal}>
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
  );
};

export default CommentReplyButton;
