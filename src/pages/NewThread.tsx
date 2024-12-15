import React, { useState, FormEvent } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";

interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

const NewThread: React.FC = () => {
  const navigate = useNavigate();
  const { categoryTitle } = useParams<{ categoryTitle: string }>();
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const categories = [
    { id: 1, emoji: "📚", title: "General" },
    { id: 2, emoji: "🧮", title: "Mathematics" },
    { id: 3, emoji: "⚛️", title: "Physics" },
    { id: 4, emoji: "🧪", title: "Chemistry" },
    { id: 5, emoji: "💻", title: "Informatics" },
    { id: 6, emoji: "🔬", title: "Biology" },
    { id: 7, emoji: "🤯", title: "Philosophy" },
    { id: 8, emoji: "🪐", title: "Astronomy" },
    { id: 9, emoji: "🌏", title: "Geography" },
    { id: 10, emoji: "💬", title: "Linguistics" },
    { id: 11, emoji: "🗿", title: "Earth Science" },
  ];

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

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Thread title cannot be empty");
      return;
    }

    if (!formData.content.trim()) {
      setError("Thread content cannot be empty");
      return;
    }

    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/threads`,
        {
          title: formData.title,
          content: formData.content,
          category_id: category.id,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate(`/${categoryTitle?.toLowerCase().replace(/\s/g, "")}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An error occurred while creating the thread. Please try again.";
      setError(errorMessage);
    }
  };

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
                className="textarea textarea-bordered h-60 w-full text-base"
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
            {error && (
              <div className="mt-4 text-center text-sm text-error">
                Error: {error}
              </div>
            )}
            {success && (
              <div className="mt-4 text-center text-sm text-success">
                {success}
              </div>
            )}
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
