import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import { RequestsProvider } from "../context/RequestsContext";

import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <RequestsProvider>
              <Dashboard />
            </RequestsProvider>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
