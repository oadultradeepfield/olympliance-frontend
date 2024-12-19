import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  username: string;
  userReputation: number;
  roleId: number;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isAuthenticated,
  username,
  userReputation,
  roleId,
  onLogout,
}) => (
  <div className="flex min-h-screen flex-col">
    <div className="border-b-2">
      <Header
        isAuthenticated={isAuthenticated}
        username={username}
        userReputation={userReputation}
        roleId={roleId}
        onLogout={onLogout}
      />
    </div>
    <div className="flex flex-grow">{children}</div>
    <Footer />
  </div>
);

export default Layout;
