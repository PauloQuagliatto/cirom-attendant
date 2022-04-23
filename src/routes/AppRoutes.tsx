import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import NewRequestPage from "../pages/NewRequestPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-request"
        element={
          <PrivateRoute>
            <NewRequestPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
