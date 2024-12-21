import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { MessageDisplay } from "../Common/MessageDisplay";
import { useEditThread } from "../../hooks/Thread/useEditThread";
import { ThreadData } from "../../data/threadData";
import { UserInfo } from "../../data/userData";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MarkdownRenderer } from "../Common/MarkdownRenderer";

interface EditThreadModalProps {
  thread: (ThreadData & { user?: UserInfo }) | null;
}

const EditThreadModal: React.FC<EditThreadModalProps> = ({ thread }) => {
  const userId = useSelector((state: RootState) => state.auth.user.user_id);
  const { error, success, handleEditThread } = useEditThread();

  const [title, setTitle] = useState(thread?.title || "");
  const [content, setContent] = useState(thread?.content || "");
  const [tags, setTags] = useState(thread?.tags.join(", ") || "");
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "tags") setTags(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleEditThread(
      thread!.thread_id,
      title,
      content,
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    );
  };

  const handleTabKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      setContent(
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

  if (userId !== thread?.user?.user_id || !thread) {
    return null;
  }

  return (
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
        <div className="modal-box min-w-96 max-w-3xl overflow-hidden p-8 md:w-full">
          <h2 className="mb-4 text-2xl font-bold">Edit Thread</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Thread Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter your thread title"
                className="input input-bordered w-full"
                value={title}
                onChange={handleInputChange}
                maxLength={100}
                required
              />
            </div>
            <div className="form-control mb-4">
              <div className="label">
                <span className="label-text">Content</span>
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
                <div className="textarea textarea-bordered h-60 max-h-60 w-full cursor-not-allowed resize-none overflow-auto text-base">
                  <MarkdownRenderer content={content} />
                </div>
              ) : (
                <textarea
                  name="content"
                  placeholder="Write your thread content here"
                  className="textarea textarea-bordered h-60 w-full resize-none font-mono text-base"
                  value={content}
                  onChange={handleInputChange}
                  onKeyDown={handleTabKeyPress}
                  maxLength={5000}
                  required
                />
              )}
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
                value={tags}
                onChange={handleInputChange}
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
                    document.getElementById("edit_modal") as HTMLDialogElement
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

export default EditThreadModal;
