import { useParams } from "react-router-dom";
import ThreadInteraction from "../../components/Thread/ThreadInteraction";
import ThreadComment from "../../components/Comment/ThreadComment";

const ThreadPage: React.FC = ({}) => {
  const { slug } = useParams<{ slug?: string }>();
  const id = slug ? Number(slug.split("-").pop()) : NaN;
  const category = slug?.split("-")[0] || "";

  return (
    <div className="mx-auto mb-24 mt-2 h-full w-full max-w-5xl flex-col items-center justify-center p-6">
      <ThreadInteraction threadId={id} category={category} />
      <div className="divider"></div>
      <ThreadComment threadId={id} />
    </div>
  );
};

export default ThreadPage;
