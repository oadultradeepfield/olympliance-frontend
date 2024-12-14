import Footer from "./components/Footer";
import Header from "./components/Header";

const App: React.FC = () => {
  const isLoggedIn: boolean = true;
  const userAvatar: string = "/src/assets/01_badges_grandmaster.png";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b-2">
        <Header isLoggedIn={isLoggedIn} userAvatar={userAvatar} />
      </div>
      <div className="flex-grow">Main content</div>
      <Footer />
    </div>
  );
};

export default App;
