import { createContext, ReactNode, useEffect, useState } from "react";

import { IUser } from "../../types";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const AuthContext = createContext({} as IAuthContext);

interface IAuthProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
