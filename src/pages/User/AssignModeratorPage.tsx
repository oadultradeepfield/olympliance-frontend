import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserManagementForm } from "../../components/User/UserManagementForm";

interface AssignModeratorPageProps {
  isAuthenticated: boolean;
  roleId: number;
}

const AssignModeratorPage: React.FC<AssignModeratorPageProps> = ({
  isAuthenticated,
  roleId,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (roleId <= 1) {
      navigate("/not-found");
    }
  }, [isAuthenticated, roleId, navigate]);

  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-4 py-12">
      <UserManagementForm
        title="Toggle Moderator Status"
        actionType="moderator"
        buttonText="Toggle Moderator"
        buttonClassName="btn-secondary"
      />
    </div>
  );
};

export default AssignModeratorPage;
