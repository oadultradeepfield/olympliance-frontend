import { useState } from "react";

import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { useNavigate } from "react-router-dom";
import { MessageDisplay } from "../Common/MessageDisplay";
import { useComment } from "../../hooks/Thread/useComment";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";

interface CommentButtonProps {
  thread: (ThreadData & { user?: UserInfo }) | null;
}

const CommentButton: React.FC<CommentButtonProps> = ({ thread }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const { success, error, handleComment } = useComment();

  const handleInputChangeComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "comment") setComment(value);
  };

  if (!thread) {
    return null;
  }

  const handleTabKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      setComment(
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

  return (
    <div>
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
          {thread.stats.comments}
        </button>
        <dialog id="comment_modal" className="modal overflow-hidden">
          <div className="modal-box min-w-96 max-w-2xl p-8 md:w-full">
            <h2 className="mb-2 text-left text-2xl font-bold">
              You're replying to the thread:
            </h2>
            <p className="mb-2 text-left text-lg italic">{thread.title}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleComment(thread.thread_id, comment);
              }}
              className="w-full"
            >
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
                    <MarkdownRenderer content={comment} />
                  </div>
                ) : (
                  <textarea
                    name="comment"
                    placeholder="Write your comment here"
                    className="textarea textarea-bordered h-60 w-full resize-none font-mono text-base"
                    value={comment}
                    onChange={handleInputChangeComment}
                    onKeyDown={handleTabKeyPress}
                    maxLength={5000}
                    required
                  />
                )}
              </div>

              {error && <MessageDisplay message={error} type="error" />}
              {success && <MessageDisplay message={success} type="success" />}

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
  );
};

export default CommentButton;
