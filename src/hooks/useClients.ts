import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { IClient } from "../../types";

type NewClient = Omit<IClient, "id">;

const useAuth = () => {
  const [clients, setClients] = useState<IClient[]>([]);

  const getClients = async () => {
    const querySnapshot = await getDocs(collection(db, "clients"));

    const dbClients: any = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dbClient = {
        id: doc.id,
        ...data,
      };

      dbClients.push(dbClient);
    });

    setClients(dbClients as IClient[]);
  };

  const getClient = async (id: string) => {
    const docRef = doc(db, "clients", id);
    const dbDoc = await getDoc(docRef);

    const data = dbDoc.data();

    let dbClient: any = {
      id,
      ...data,
    };

    return dbClient as IClient;
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
    getClient,
    getClients,
    updateClient,
  };
};

export default useAuth;
