import { useContext } from "react";
import { collection, getDocs } from "firebase/firestore";

import { ClientsContext } from "../context/ClientsContext";
import { db } from "../services/firebase";
import { IClient } from "../../types";

const useAuth = () => {
  const { clients, setClients } = useContext(ClientsContext);

  const getClients = async () => {
    const dbClients: any = [];

    const querySnapshot = await getDocs(collection(db, "clients"));

    querySnapshot.forEach((doc) => {
      dbClients.push(doc.data());
    });

    setClients(dbClients);
  };

  return {
    clients,
    getClients,
  };
};

export default useAuth;
