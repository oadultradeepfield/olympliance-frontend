import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  emoji,
  title,
  description,
}) => {
  const linkPath = `/${title.toLowerCase().replace(/\s/g, "")}`;

  return (
    <Link to={linkPath}>
      <div
        key={id}
        className="card transform border-2 transition-all duration-300 hover:border-secondary hover:text-secondary"
      >
        <div className="card-body items-center text-center">
          <div className="mb-4 flex h-16 w-24 items-center justify-center rounded-full text-6xl">
            {emoji}
          </div>
          <h3 className="card-title text-xl font-semibold">{title}</h3>
          <div className="text-base-3-content">{description}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
