import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useEditComment } from "../../hooks/Comment/useEditComment";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import { MessageDisplay } from "../Common/MessageDisplay";

interface EditCommentButtonProps {
  userId: number;
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
}

const EditCommentButton: React.FC<EditCommentButtonProps> = ({
  userId,
  comment,
}) => {
  const { error, success, handleEditComment } = useEditComment();

  const [commentContent, setCommentContent] = useState(comment?.content || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
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
        className="pl-2"
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
      <dialog id={`edit_comment_modal_${comment.comment_id}`} className="modal">
        <div className="modal-box min-w-96 max-w-3xl p-8 md:w-full">
          <h2 className="mb-4 text-2xl font-bold">Edit Comment</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                name="content"
                placeholder="Write your comment here"
                className="textarea textarea-bordered h-60 w-full resize-none text-base"
                value={commentContent}
                onChange={handleInputChange}
                maxLength={5000}
                required
              />
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
