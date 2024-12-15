import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";
import CategoryThreads from "./pages/CategoryThreads";
import NewThread from "./pages/NewThread";
import ThreadPage from "./pages/ThreadPage";
import BanUserPage from "./pages/BanUserPage";
import AssignModeratorPage from "./pages/AssignModeratorPage";

const apiUrl: string = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [userReputation, setUserReputation] = useState<number>(0);
  const [roleId, setRoleId] = useState<number>(0);

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
          setRoleId(response.data.role_id);
          setUserReputation(response.data.reputation);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserReputation(0);
    setRoleId(0);
  };

  return (
    <Router>
      <div className="flex h-screen flex-col">
        <div className="border-b-2">
          <Header
            isAuthenticated={isAuthenticated}
            userReputation={userReputation}
            roleId={roleId}
            onLogout={handleLogout}
          />
        </div>
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/:categoryTitle" element=<CategoryThreads /> />
          <Route path="/:categoryTitle/:slug" element=<ThreadPage /> />
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
            path="/change-password"
            element={<ChangePassword isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/ban-user"
            element=<BanUserPage
              isAuthenticated={isAuthenticated}
              roleId={roleId}
            />
          />
          <Route
            path="/assign-moderator"
            element=<AssignModeratorPage
              isAuthenticated={isAuthenticated}
              roleId={roleId}
            />
          />
          <Route
            path="/:categoryTitle/new"
            element=<NewThread isAuthenticated={isAuthenticated} />
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
