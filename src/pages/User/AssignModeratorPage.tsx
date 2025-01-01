import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserManagementForm } from "../../components/User/UserManagementForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AssignModeratorPage: React.FC = ({}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const roleId = useSelector((state: RootState) => state.auth.user.role_id);

  const navigate = useNavigate();

  const { username } = useParams();

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
        username={username}
      />
    </div>
  );
};

export default AssignModeratorPage;
