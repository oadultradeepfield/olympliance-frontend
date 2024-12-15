import { useNavigate } from "react-router-dom";

interface CategoryHeroProps {
  categoryEmoji: string;
  categoryTitle: string;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({
  categoryEmoji,
  categoryTitle,
}) => {
  const navigate = useNavigate();
  const handleCreateThread = () => {
    navigate(`/${categoryTitle.toLowerCase().replace(/\s/g, "")}/new`);
  };

  return (
    <div className="hero mt-8">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-1 text-5xl font-bold">
            {categoryEmoji} {categoryTitle}
          </h1>
          <div className="px-3 py-6 text-lg">
            Welcome to a vibrant community where you can explore, learn, and
            collaborate. Share your insights, ask questions, and connect with
            others passionate about{" "}
            {categoryTitle == "General" ? "Science" : categoryTitle}. Get
            started today and be a part of the conversation!
          </div>
          <button className="btn btn-primary" onClick={handleCreateThread}>
            Ask a Question {"→"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
