import { categories } from "../../data/categoriesData";
import CategoryList from "./CategoryList";

const Categories: React.FC = () => {
  return (
    <div className="container mx-auto mb-12 px-6 py-4">
      <CategoryList categories={categories} />
    </div>
  );
};

export default Categories;
