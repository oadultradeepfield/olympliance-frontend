import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b-2">
        <Header />
      </div>
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
