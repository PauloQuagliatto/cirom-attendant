import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import { DentistsProvider } from "../context/DentistsContext";
import { ClientsProvider } from "../context/ClientsContext";
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
            <DentistsProvider>
              <ClientsProvider>
                <RequestsProvider>
                  <Dashboard />
                </RequestsProvider>
              </ClientsProvider>
            </DentistsProvider>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
