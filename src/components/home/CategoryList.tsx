import { Category } from "../../data/categoriesData";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          emoji={category.emoji}
          title={category.title}
          description={category.description}
        />
      ))}
    </div>
  );
};

export default CategoryList;
