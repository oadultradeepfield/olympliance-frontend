import { useParams } from "react-router-dom";
import ThreadInteraction from "../../components/Thread/ThreadInteraction";
import ThreadComment from "../../components/Comment/ThreadComment";

interface ThreadPageProps {
  isAuthenticated: boolean;
  roleId: number;
  userId: number;
}

const ThreadPage: React.FC<ThreadPageProps> = ({
  isAuthenticated,
  roleId,
  userId,
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const id = slug ? Number(slug.split("-").pop()) : NaN;
  const category = slug?.split("-")[0] || "";

  return (
    <div className="mx-auto mb-24 mt-2 h-full w-full max-w-5xl flex-col items-center justify-center p-6">
      <ThreadInteraction
        threadId={id}
        category={category}
        isAuthenticated={isAuthenticated}
        roleId={roleId}
        userId={userId}
      />
      <ThreadComment
        threadId={id}
        userId={userId}
        roleId={roleId}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default ThreadPage;
