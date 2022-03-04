import { createContext, ReactNode, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../services/firebase";

import { IClient } from "../../types";

interface IClientsContext {
  clients: IClient[];
  setClients: (clients: IClient[]) => void;
}

const ClientsContext = createContext({} as IClientsContext);

interface IAuthProps {
  children: ReactNode;
}

const ClientsProvider = ({ children }: IAuthProps) => {
  const [clients, setClients] = useState<IClient[]>([]);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        setClients,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export { ClientsContext, ClientsProvider };
