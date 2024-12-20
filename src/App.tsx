import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./components/Layout/AppLayout";
import { useAuth } from "./hooks/Auth/useAuth";

const App: React.FC = () => {
  useAuth();
  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export default App;
