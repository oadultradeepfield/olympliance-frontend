import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./components/Layout/AppLayout";
import { useAuth } from "./hooks/Auth/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Loading from "./components/Common/Loading";
import axios from "axios";

const App: React.FC = () => {
  const { isUserDataLoaded } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useAuth();

  if (!isUserDataLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
  );
};

export default App;
