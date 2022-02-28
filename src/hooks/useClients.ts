import { useContext } from "react";
import { collection, doc, setDoc } from "firebase/firestore";

import { ClientsContext } from "../context/ClientsContext";
import { db } from "../services/firebase";

import { IClient } from "../../types";

const useAuth = () => {
  const { clients, setClients } = useContext(ClientsContext);
  const clientsRef = collection(db, "clients");

  const addClient = async (client: IClient) => {
    const dbClient = await setDoc(doc(clientsRef), client);
    console.log(dbClient);
  };

  return {
    clients,
    addClient,
  };
};

export default useAuth;
