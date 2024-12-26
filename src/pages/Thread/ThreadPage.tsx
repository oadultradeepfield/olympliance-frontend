import { useParams } from "react-router-dom";
import ThreadInteraction from "../../components/Thread/ThreadInteraction";
import ThreadComment from "../../components/Comment/ThreadComment";

const ThreadPage: React.FC = () => {
  const { categoryTitle, id } = useParams<{
    categoryTitle?: string;
    id?: string;
  }>();
  const threadId = id ? Number(id) : NaN;

  return (
    <div className="mx-auto mb-24 mt-2 h-full w-full max-w-5xl flex-col items-center justify-center p-6">
      <ThreadInteraction threadId={threadId} category={categoryTitle || ""} />
      <div className="divider my-4"></div>
      <ThreadComment threadId={threadId} />
    </div>
  );
};

export default ThreadPage;
