import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

const App: React.FC = () => {
  const isLoggedIn: boolean = false;
  const userAvatar: string = "/src/assets/01_badges_grandmaster.png";

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b-2">
        <Header isLoggedIn={isLoggedIn} userAvatar={userAvatar} />
      </div>
      <Home />
      <Footer />
    </div>
  );
};

export default App;
