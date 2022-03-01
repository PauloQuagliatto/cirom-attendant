import { createContext, ReactNode, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../services/firebase";

import { IRequest } from "../../types";

interface IRequestsContext {
  requests: IRequest[] | null;
  setRequests: (requests: IRequest[] | null) => void;
}

const RequestsContext = createContext({} as IRequestsContext);

interface IRequestsProps {
  children: ReactNode;
}

const RequestsProvider = ({ children }: IRequestsProps) => {
  const [requests, setRequests] = useState<IRequest[] | null>(null);

  const getRequests = async () => {
    const snapshot = await getDocs(collection(db, "requests"));

    const dbRequests: any = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      
      const request = {
        id: doc.id,
        ...data
      }

      dbRequests.push(request as IRequest);
    });

    setRequests(dbRequests as IRequest[]);
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <RequestsContext.Provider
      value={{
        requests,
        setRequests,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export { RequestsContext, RequestsProvider };
