import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useEditComment } from "../../hooks/Comment/useEditComment";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import { MessageDisplay } from "../Common/MessageDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";

interface EditCommentButtonProps {
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
}

const EditCommentButton: React.FC<EditCommentButtonProps> = ({ comment }) => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);

  const { error, success, handleEditComment } = useEditComment();

  const [commentContent, setCommentContent] = useState(comment?.content || "");
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleTabKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      setCommentContent(
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment) {
      handleEditComment(comment.comment_id, commentContent);
    }
  };

  if (userId !== comment?.user?.user_id || !comment || comment.is_deleted) {
    return null;
  }

  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById(
              `edit_comment_modal_${comment.comment_id}`,
            ) as HTMLDialogElement
          ).showModal()
        }
      >
        <PencilIcon className="h-4 w-4 text-base-content hover:text-success" />
      </button>
      <dialog
        id={`edit_comment_modal_${comment.comment_id}`}
        className="modal overflow-hidden"
      >
        <div className="modal-box min-w-96 max-w-3xl p-8 md:w-full">
          <h2 className="mb-4 text-2xl font-bold text-base-content">
            Edit Comment
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control mb-4 text-base-content">
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
                  <MarkdownRenderer content={commentContent} />
                </div>
              ) : (
                <textarea
                  name="content"
                  placeholder="Write your comment here"
                  className="textarea textarea-bordered h-60 w-full resize-none font-mono text-base"
                  value={commentContent}
                  onChange={handleInputChange}
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
  );
};

export default EditCommentButton;
