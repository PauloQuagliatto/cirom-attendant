import { useContext } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { RequestsContext } from "../context/RequestsContext";
import { db } from "../services/firebase";

import { IRequest } from "../../types";

type NewRequest = Omit<IRequest, "id">;

const useAuth = () => {
  const { requests, setRequests } = useContext(RequestsContext);
  const requestsRef = collection(db, "requests");

  const addRequest = async (newRequest: NewRequest) => {
    try {
      const dbRequest = await addDoc(requestsRef, newRequest);

      setRequests([...requests!, { id: dbRequest.id, ...newRequest }]);
    } catch {
      console.log("deu Erro");
    }
  };

  const updateRequest = async (update: IRequest) => {
    await updateDoc(doc(requestsRef), { ...update });

    const updatedRequests: any = [];

    requests!.map((request) => {
      if (request.id === update.id) {
        updatedRequests.push({
          ...request,
          ...update,
        });
      } else {
        updatedRequests.push(request);
      }
    });

    setRequests(updatedRequests as IRequest[]);
  };
  return { requests, addRequest, updateRequest };
};

export default useAuth;
