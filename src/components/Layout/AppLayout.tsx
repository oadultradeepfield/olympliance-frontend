import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-[50]">
        <div className="border-b-2 border-base-content/15 bg-base-100/50 backdrop-blur-md">
          <Header />
        </div>
        {user?.is_banned && (
          <div className="bg-red-500 p-2 text-center text-white">
            You have been banned and cannot interact with the website.
          </div>
        )}
      </div>
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
