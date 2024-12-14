import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const isLoggedIn: boolean = false;
  const userAvatar: string = "/src/assets/01_badges_grandmaster.png";

  return (
    <Router>
      <div className="flex h-screen flex-col">
        <div className="border-b-2">
          <Header isLoggedIn={isLoggedIn} userAvatar={userAvatar} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
