import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { RequestsProvider } from "./context/RequestsContext";

import AppRoutes from "./routes/AppRoutes";

import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <AuthProvider>
    <ToastContainer />
      <RequestsProvider>
        <GlobalStyle />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RequestsProvider>
    </AuthProvider>
  );
};

export default App;
