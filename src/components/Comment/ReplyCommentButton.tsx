import { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useReplyComment } from "../../hooks/Comment/useReplyComment";
import { MessageDisplay } from "../Common/MessageDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";

interface ReplyCommentButtonProps {
  threadId: number;
  parentCommentId: number;
  content: string;
}

const ReplyCommentButton: React.FC<ReplyCommentButtonProps> = ({
  threadId,
  parentCommentId,
  content,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const { replyComment } = useReplyComment();
  const [replyCommentFormData, setReplyCommentFormData] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChangeReplyComment = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyCommentFormData(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!replyCommentFormData.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    replyComment(threadId, parentCommentId, replyCommentFormData)
      .then(() => {
        setSuccess("Your comment has been posted!");
        setReplyCommentFormData("");
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

  const handleTabKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      setReplyCommentFormData(
        value.substring(0, selectionStart) +
          spaces +
          value.substring(selectionEnd),
      );

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + spaces.length;
        textarea.focus();
      }, 0);
    }
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
          <MarkdownRenderer
            content={`"${content}"`}
            className="mb-2 text-lg italic text-base-content/75"
          ></MarkdownRenderer>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control mb-4">
              <div className="label">
                <span className="label-text">Comment</span>
                <span className="label cursor-pointer">
                  <span className="label-text mr-3">Preview Mode</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={showPreview}
                    onChange={() => setShowPreview(!showPreview)}
                  />
                </span>
              </div>
              {showPreview ? (
                <div className="textarea textarea-bordered flex h-60 max-h-60 w-full cursor-not-allowed resize-none justify-start overflow-auto text-base">
                  <MarkdownRenderer content={replyCommentFormData} />
                </div>
              ) : (
                <textarea
                  name="comment"
                  placeholder="Write your comment here"
                  className="textarea textarea-bordered h-60 w-full resize-none font-mono text-base"
                  value={replyCommentFormData}
                  onChange={handleInputChangeReplyComment}
                  onKeyDown={handleTabKeyPress}
                  maxLength={5000}
                  required
                />
              )}
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

export default ReplyCommentButton;
