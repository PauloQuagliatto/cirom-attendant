import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return user;
};

export default useAuth;
