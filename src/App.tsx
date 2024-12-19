import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/Auth/AuthPage";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/Auth/ChangePassword";
import CategoryThreads from "./pages/Category/CategoryThreads";
import NewThread from "./pages/Thread/NewThread";
import ThreadPage from "./pages/Thread/ThreadPage";
import BanUserPage from "./pages/User/BanUserPage";
import AssignModeratorPage from "./pages/User/AssignModeratorPage";
import FollowedThreads from "./pages/Thread/FollowedThreads";
import Loading from "./components/Common/Loading";

const App: React.FC = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [userReputation, setUserReputation] = useState<number>(0);
  const [roleId, setRoleId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (!token) return;

      axios
        .get(`${apiUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.username);
          setUserId(response.data.user_id);
          setRoleId(response.data.role_id);
          setUserReputation(response.data.reputation);
          setIsUserDataLoaded(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setIsUserDataLoaded(true);
        });
    } else {
      setIsUserDataLoaded(true);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserReputation(0);
    setRoleId(0);
    window.location.reload();
  };

  return (
    <Router>
      {isUserDataLoaded ? (
        <div className="flex min-h-screen flex-col">
          <div className="border-b-2">
            <Header
              isAuthenticated={isAuthenticated}
              username={username}
              userReputation={userReputation}
              roleId={roleId}
              onLogout={handleLogout}
            />
          </div>
          <div className="flex flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:categoryTitle" element={<CategoryThreads />} />
              <Route
                path="/thread/:slug"
                element={
                  <ThreadPage
                    isAuthenticated={isAuthenticated}
                    roleId={roleId}
                    userId={userId}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <AuthPage
                      setIsAuthenticated={(authenticated: boolean) => {
                        setIsAuthenticated(authenticated);
                      }}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/followed-threads"
                element={<FollowedThreads userId={userId} />}
              />
              <Route
                path="/change-password"
                element={<ChangePassword isAuthenticated={isAuthenticated} />}
              />
              <Route
                path="/ban-user"
                element={
                  <BanUserPage
                    isAuthenticated={isAuthenticated}
                    roleId={roleId}
                  />
                }
              />
              <Route
                path="/assign-moderator"
                element={
                  <AssignModeratorPage
                    isAuthenticated={isAuthenticated}
                    roleId={roleId}
                  />
                }
              />
              <Route
                path="/:categoryTitle/new"
                element={<NewThread isAuthenticated={isAuthenticated} />}
              />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </Router>
  );
};

export default App;
