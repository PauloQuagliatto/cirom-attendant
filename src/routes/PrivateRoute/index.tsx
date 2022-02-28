import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface IProps {
  children: any;
}

const PrivateRoute = ({ children }: IProps) => {
  const { auth, user } = useAuth();
  const location = useLocation();

  if (!auth && !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
