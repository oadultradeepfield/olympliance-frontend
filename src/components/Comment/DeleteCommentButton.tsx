import { TrashIcon } from "@heroicons/react/24/outline";
import { CommentData } from "../../data/commentData";
import { UserInfo } from "../../data/userData";
import { Interaction } from "../../data/interactionData";
import { useDeleteComment } from "../../hooks/Comment/useDeleteComment";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface DeleteCommentButtonProps {
  comment: CommentData & { user?: UserInfo; interactions?: Interaction[] };
}

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  comment,
}) => {
  const roleId = useSelector((state: RootState) => state.auth.user.role_id);
  const userId = useSelector((state: RootState) => state.auth.user.user_id);

  const { deleteComment } = useDeleteComment();

  const handleDelete = () => {
    deleteComment(comment.comment_id);
    (
      document.getElementById(
        `delete_comment_modal_${comment.comment_id}`,
      ) as HTMLDialogElement
    ).close();
  };

  if (
    !(
      userId === comment?.user?.user_id ||
      roleId > (comment?.user?.role_id ?? 0)
    ) ||
    comment.is_deleted
  ) {
    return null;
  }

  return (
    <>
      <button
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
            Are you sure you want to delete this comment? This action cannot be
            undone.
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
            <button className="btn btn-error" onClick={handleDelete}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteCommentButton;
