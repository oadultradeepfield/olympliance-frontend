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
import Terms from "../pages/Terms/Terms";
import Policy from "../pages/Terms/Policy";
import DeleteAccount from "../pages/Auth/DeleteAccount";
import UserCardPage from "../pages/User/UserCardPage";

const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:categoryTitle" element={<CategoryThreads />} />
      <Route path="/:categoryTitle/thread/:id" element={<ThreadPage />} />
      <Route
        path="/login"
        element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
      />
      <Route path="/user/:username" element={<UserCardPage />} />
      <Route path="/followed-threads" element={<FollowedThreads />} />
      <Route path="/change-username" element={<ChangeUsername />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="/ban-user" element={<BanUserPage />} />
      <Route path="/assign-moderator" element={<AssignModeratorPage />} />
      {/* Optional username params for fixing the name */}
      <Route path="/ban-user/:username" element={<BanUserPage />} />
      <Route
        path="/assign-moderator/:username"
        element={<AssignModeratorPage />}
      />
      <Route path="/:categoryTitle/new" element={<NewThread />} />
      <Route path="/terms-of-service" element={<Terms />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
