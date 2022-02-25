import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

const AuthContext = createContext({} as IAuthContext);

interface IAuthProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProps) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
