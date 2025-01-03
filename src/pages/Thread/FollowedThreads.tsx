import FollowedThreadList from "../../components/User/FollowedThreadList";

const FollowedThreads: React.FC = () => {
  return (
    <div className="mx-auto mb-24 h-full w-full max-w-5xl flex-col items-center justify-center px-6">
      <div className="hero mt-8">
        <div className="hero-content text-center">
          <h1 className="mb-1 text-4xl font-bold">📚 Your Followed Threads</h1>
        </div>
      </div>
      <FollowedThreadList />
    </div>
  );
};
export default FollowedThreads;
