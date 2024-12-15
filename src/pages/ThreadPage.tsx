import { useParams } from "react-router-dom";

const ThreadPage: React.FC = () => {
  const { categoryTitle, slug } = useParams();
  const id = slug?.split("-").pop();

  return (
    <div>
      <h1>Category: {categoryTitle}</h1>
      <p>Viewing thread with ID: {id}</p>
    </div>
  );
};

export default ThreadPage;
