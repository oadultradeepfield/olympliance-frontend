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
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ChangeUsername from "../pages/Auth/ChangeUsername";

const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:categoryTitle" element={<CategoryThreads />} />
      <Route path="/thread/:slug" element={<ThreadPage />} />
      <Route
        path="/login"
        element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
      />
      <Route path="/followed-threads" element={<FollowedThreads />} />
      <Route path="/change-username" element={<ChangeUsername />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/ban-user" element={<BanUserPage />} />
      <Route path="/assign-moderator" element={<AssignModeratorPage />} />
      <Route path="/:categoryTitle/new" element={<NewThread />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
