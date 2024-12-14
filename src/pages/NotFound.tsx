import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-4 font-mono text-4xl font-bold text-error">
        404 - Page Not Found
      </h1>
      <div className="text-base-content-100 mb-6 text-lg">
        Oops! The page you are looking for doesn't exist.
      </div>
      <Link to="/" className="btn btn-outline btn-secondary">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
