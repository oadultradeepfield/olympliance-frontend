import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserManagementForm } from "../../components/User/UserManagementForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BanUserPage: React.FC = ({}) => {
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
        username={username}
      />
    </div>
  );
};

export default BanUserPage;
