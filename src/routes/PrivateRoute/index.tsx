import { Navigate, useLocation } from "react-router-dom";

import Header from "../../components/Header";

import useAuth from "../../hooks/useAuth";

interface IProps {
  children: any;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PrivateRoute;
