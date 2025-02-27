import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { categories } from "../../data/categoriesData";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useNewThread } from "../../hooks/Thread/useNewThread";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MarkdownRenderer } from "../../components/Common/MarkdownRenderer";

interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

const NewThread: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const navigate = useNavigate();
  const { categoryTitle } = useParams<{ categoryTitle: string }>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const category = categories.find(
    (cat) =>
      cat.title.toLowerCase().replace(/\s/g, "") ===
      categoryTitle?.toLowerCase().replace(/\s/g, ""),
  );

  if (!category) {
    return <Navigate to="/not-found" />;
  }

  const [formData, setFormData] = useState<ThreadFormData>({
    title: "",
    content: "",
    tags: "",
  });

  const handleTabKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      const updatedValue =
        value.substring(0, selectionStart) +
        spaces +
        value.substring(selectionEnd);

      setFormData((prevState) => ({
        ...prevState,
        content: updatedValue,
      }));

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + spaces.length;
        textarea.focus();
      }, 0);
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { handleSubmit, error, success } = useNewThread(
    formData,
    category,
    navigate,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-grow flex-col items-center justify-center px-6 py-12">
      <div className="card mx-auto w-full max-w-3xl border-2 bg-base-100">
        <div className="card-body">
          <h2 className="card-title mb-4 text-2xl">
            {category.emoji} New Thread in {category.title}
          </h2>
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
                value={formData.title}
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
                <div className="textarea textarea-bordered h-60 w-full cursor-not-allowed resize-none overflow-auto text-base">
                  <MarkdownRenderer content={formData.content} />
                </div>
              ) : (
                <textarea
                  name="content"
                  placeholder="Write your thread content here"
                  className="textarea textarea-bordered h-60 w-full resize-none font-mono text-base"
                  value={formData.content}
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
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            {error && <MessageDisplay message={error} type="error" />}

            {success && <MessageDisplay message={success} type="success" />}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Create Thread
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewThread;
