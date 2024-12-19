import { useParams, Navigate } from "react-router-dom";
import CategoryHero from "../../components/Category/CategoryHero";
import ThreadList from "../../components/Category/ThreadList";
import { categories } from "../../data/categoriesData";

const CategoryThreads: React.FC = () => {
  const { categoryTitle } = useParams<{ categoryTitle: string }>();

  const category = categories.find(
    (cat) =>
      cat.title.toLowerCase().replace(/\s/g, "") ===
      categoryTitle?.toLowerCase().replace(/\s/g, ""),
  );

  if (!category) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="mx-auto mb-24 h-full w-full max-w-5xl flex-col items-center justify-center px-6">
      <CategoryHero category={category} />
      <ThreadList
        categoryId={category.id}
        categoryTitle={category.title.toLowerCase().replace(/\s/g, "")}
      />
    </div>
  );
};

export default CategoryThreads;
