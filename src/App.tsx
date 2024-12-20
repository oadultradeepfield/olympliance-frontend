import { BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/Common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./components/Layout/AppLayout";

const App: React.FC = () => {
  const isUserDataLoaded = useSelector(
    (state: RootState) => state.auth.isUserDataLoaded,
  );

  return (
    <Router>
      {isUserDataLoaded ? (
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Loading />
        </div>
      )}
    </Router>
  );
};

export default App;
