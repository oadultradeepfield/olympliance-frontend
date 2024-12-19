import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { categories } from "../../data/categoriesData";
import { MessageDisplay } from "../../components/Common/MessageDisplay";
import { useNewThread } from "../../hooks/Thread/useNewThread";

interface NewThreadProps {
  isAuthenticated: boolean;
}

interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

const NewThread: React.FC<NewThreadProps> = ({ isAuthenticated }) => {
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
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content"
                placeholder="Write your thread content here"
                className="textarea textarea-bordered h-60 w-full resize-none text-base"
                value={formData.content}
                onChange={handleInputChange}
                maxLength={5000}
                required
              />
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
