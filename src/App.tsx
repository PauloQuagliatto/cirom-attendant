import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { ClientsProvider } from "./context/ClientsContext";

import AppRoutes from "./routes/AppRoutes";

import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <GlobalStyle />
      <ClientsProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ClientsProvider>
    </AuthProvider>
  );
};

export default App;
