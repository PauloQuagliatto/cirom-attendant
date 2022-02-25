import { createContext, ReactNode, useState } from "react";

import { IRequest } from "../../types";

interface IClientsContext {
  requests: IRequest[];
  setRequests: (requests: IRequest[]) => void;
}

const AuthContext = createContext({} as IClientsContext);

interface IAuthProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProps) => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  return (
    <AuthContext.Provider
      value={{
        requests,
        setRequests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
