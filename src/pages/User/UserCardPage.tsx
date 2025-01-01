import Loading from "../../components/Common/Loading";
import UserCard from "../../components/User/UserCard";
import { useGetUserCard } from "../../hooks/User/useGetUserCard";
import { useParams, Navigate } from "react-router-dom";

const UserCardPage: React.FC = () => {
  const { username } = useParams<{
    username: string;
  }>();

  const { userCard, loading } = useGetUserCard(username!);

  if (loading) {
    return (
      <div className="mx-auto flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!userCard?.user_id || userCard?.is_deleted) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <UserCard userCard={userCard!} />
    </div>
  );
};

export default UserCardPage;
