import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [userReputation, setUserReputation] = useState<number>(0);
  const [roleId, setRoleId] = useState<number>(0);

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
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
