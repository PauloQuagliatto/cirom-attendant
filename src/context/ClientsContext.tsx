import { createContext, ReactNode, useState } from "react";

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
