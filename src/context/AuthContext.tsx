import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { fbAuth } from "../services/firebase";

import { IUser } from "../../types";

interface IAuthContext {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext({} as IAuthContext);

interface IAuthProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProps) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const authorizeProgram = async () => {
    await signInWithEmailAndPassword(
      fbAuth,
      import.meta.env.VITE_APP_PROGRAM_EMAIL as string,
      import.meta.env.VITE_APP_PROGRAM_PASSWORD as string
    );
    setAuth(true);
  };

  useEffect(() => {
    authorizeProgram();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
