import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/Auth/AuthPage";
import NotFound from "../pages/NotFound";
import ChangePassword from "../pages/Auth/ChangePassword";
import CategoryThreads from "../pages/Category/CategoryThreads";
import NewThread from "../pages/Thread/NewThread";
import ThreadPage from "../pages/Thread/ThreadPage";
import BanUserPage from "../pages/User/BanUserPage";
import AssignModeratorPage from "../pages/User/AssignModeratorPage";
import FollowedThreads from "../pages/Thread/FollowedThreads";

const AppRoutes = ({
  isAuthenticated,
  roleId,
  userId,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  roleId: number;
  userId: number;
  setIsAuthenticated: (authenticated: boolean) => void;
}) => (
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
          <AuthPage setIsAuthenticated={setIsAuthenticated} />
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
        <BanUserPage isAuthenticated={isAuthenticated} roleId={roleId} />
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
);

export default AppRoutes;
