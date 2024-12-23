import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data/apiUrl";

interface ThreadFormData {
  title: string;
  content: string;
  tags: string;
}

export const useNewThread = (
  formData: ThreadFormData,
  category: { id: number; title: string },
  navigate: (path: string) => void,
) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const access_token = localStorage.getItem("access_token");
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
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      setSuccess(response.data.message);
      setTimeout(() => {
        navigate(`/${category.title.toLowerCase().replace(/\s/g, "")}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response.data.error ||
        "An error occurred while creating the thread. Please try again.";
      setError(errorMessage);
    }
  };

  return { handleSubmit, error, success };
};
