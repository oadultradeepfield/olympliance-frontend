import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  const isLoggedIn: boolean = true;
  const userReputation: number = 800;
  const roleId: number = 2;

  return (
    <Router>
      <div className="flex h-screen flex-col">
        <div className="border-b-2">
          <Header
            isLoggedIn={isLoggedIn}
            userReputation={userReputation}
            roleId={roleId}
          />
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
