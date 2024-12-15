import { useParams, Navigate } from "react-router-dom";
import CategoryHero from "../components/CategoryHero";
import ThreadList from "../components/ThreadList";

const CategoryThreads = () => {
  const { categoryTitle } = useParams();
  const categories = [
    {
      id: 1,
      emoji: "📚",
      title: "General",
    },
    {
      id: 2,
      emoji: "🧮",
      title: "Mathematics",
    },
    {
      id: 3,
      emoji: "⚛️",
      title: "Physics",
    },
    {
      id: 4,
      emoji: "🧪",
      title: "Chemistry",
    },
    {
      id: 5,
      emoji: "💻",
      title: "Informatics",
    },
    {
      id: 6,
      emoji: "🔬",
      title: "Biology",
    },
    {
      id: 7,
      emoji: "🤯",
      title: "Philosophy",
    },
    {
      id: 8,
      emoji: "🪐",
      title: "Astronomy",
    },
    {
      id: 9,
      emoji: "🌏",
      title: "Geography",
    },
    {
      id: 10,
      emoji: "💬",
      title: "Linguistics",
    },
    {
      id: 11,
      emoji: "🗿",
      title: "Earth Science",
    },
  ];

  const category = categories.find(
    (cat) =>
      cat.title.toLowerCase().replace(/\s/g, "") ===
      categoryTitle?.toLowerCase().replace(/\s/g, ""),
  );

  if (!category) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="mx-auto h-full w-full max-w-5xl flex-col items-center justify-center px-6">
      <CategoryHero
        categoryEmoji={category.emoji}
        categoryTitle={category.title}
      />
      <ThreadList categoryId={category.id} />
    </div>
  );
};

export default CategoryThreads;
