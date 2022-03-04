import { useContext } from "react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { ClientsContext } from "../context/ClientsContext";
import { db } from "../services/firebase";

import { IClient } from "../../types";

type NewClient = Omit<IClient, "id">;

const useAuth = () => {
  const { clients, setClients } = useContext(ClientsContext);

  const getClients = async () => {
    const querySnapshot = await getDocs(collection(db, "clients"));

    const dbClients: any = [];

    querySnapshot.forEach((doc) => {
      dbClients.push(doc.data());
    });

    setClients(dbClients as IClient[]);
  };
  const addClient = async (client: NewClient) => {
    const dbClient = await addDoc(collection(db, "clients"), client);
    const newClient = { id: dbClient.id, ...client };
    setClients([...clients!, newClient]);

    return newClient.id;
  };

  const updateClient = async (update: IClient) => {
    await setDoc(doc(db, "clients", update.id), { ...update });

    const updatedRequests: any = [];

    clients!.map((client) => {
      if (client.id === update.id) {
        updatedRequests.push({
          ...client,
          ...update,
        });
      } else {
        updatedRequests.push(client);
      }
    });

    setClients(updatedRequests as IClient[]);
  };

  return {
    clients,
    addClient,
    getClients,
    updateClient,
  };
};

export default useAuth;
