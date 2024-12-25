import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-[50] border-b-2 border-base-content/15 bg-base-100/50 backdrop-blur-lg">
        <Header />
      </div>
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
