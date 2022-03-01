import { useContext } from "react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { RequestsContext } from "../context/RequestsContext";
import { db } from "../services/firebase";

import { IRequest } from "../../types";

type NewRequest = Omit<IRequest, "id">;

const useRequests = () => {
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
    await setDoc(doc(db, "requests", update.id), { ...update });

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

export default useRequests;
