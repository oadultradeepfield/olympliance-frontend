import { TrashIcon } from "@heroicons/react/24/outline";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { useDeleteThread } from "../../hooks/Thread/useDeleteThread";

interface DeleteThreadModalProps {
  userId: number;
  roleId: number;
  thread: (ThreadData & { user?: UserInfo }) | null;
  apiUrl: string;
  category: string;
}

const DeleteThreadModal: React.FC<DeleteThreadModalProps> = ({
  userId,
  roleId,
  thread,
  apiUrl,
  category,
}) => {
  const { deleteThread } = useDeleteThread(apiUrl, category);

  const handleDeleteThread = () => {
    if (thread) {
      deleteThread(thread.thread_id);
    }
  };

  if (
    !(userId === thread?.user?.user_id || roleId > (thread?.user?.role_id || 0))
  ) {
    return null;
  }

  return (
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
            Are you sure you want to delete this thread? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).close()
              }
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                handleDeleteThread();
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).close();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteThreadModal;
