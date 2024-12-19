import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManagementForm } from "../../components/User/UserManagementForm";

interface BanUserPageProps {
  isAuthenticated: boolean;
  roleId: number;
}

const BanUserPage: React.FC<BanUserPageProps> = ({
  isAuthenticated,
  roleId,
}) => {
  const navigate = useNavigate();
  const apiUrl: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (roleId === 0) {
      navigate("/not-found");
    }
  }, [isAuthenticated, roleId, navigate]);

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <UserManagementForm
        title="Toggle User Ban"
        actionType="ban"
        buttonText="Toggle Ban"
        buttonClassName="btn-error"
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default BanUserPage;
