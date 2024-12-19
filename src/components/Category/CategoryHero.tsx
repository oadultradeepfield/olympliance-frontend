import { useNavigate } from "react-router-dom";
import { Category } from "../../data/categoriesData";

interface CategoryHeroProps {
  category: Category;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleCreateThread = () => {
    navigate(`/${category.title.toLowerCase().replace(/\s/g, "")}/new`);
  };

  return (
    <div className="hero mt-8">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-1 text-5xl font-bold">
            {category.emoji} {category.title}
          </h1>
          <div className="px-3 py-6 text-lg">
            Welcome to a vibrant community where you can explore, learn, and
            collaborate. Share your insights, ask questions, and connect with
            others passionate about{" "}
            {category.title === "General" ? "Science" : category.title}. Get
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
