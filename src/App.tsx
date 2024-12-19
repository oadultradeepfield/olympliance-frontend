import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/Common/Loading";
import { useAuth } from "./hooks/Auth/useAuth";
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./components/Layout/AppLayout";

const App: React.FC = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    isUserDataLoaded,
    handleLogout,
  } = useAuth();

  return (
    <Router>
      {isUserDataLoaded ? (
        <AppLayout
          isAuthenticated={isAuthenticated}
          username={user.username}
          userReputation={user.reputation}
          roleId={user.roleId}
          onLogout={handleLogout}
        >
          <AppRoutes
            isAuthenticated={isAuthenticated}
            roleId={user.roleId}
            userId={user.userId}
            setIsAuthenticated={setIsAuthenticated}
          />
        </AppLayout>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      )}
    </Router>
  );
};

export default App;
