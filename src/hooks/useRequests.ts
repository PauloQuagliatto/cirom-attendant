import { useContext } from "react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { RequestsContext } from "../context/RequestsContext";
import { db } from "../services/firebase";

import { IRequest } from "../../types";

type NewRequest = Omit<IRequest, "id">;

const useRequests = () => {
  const { requests, setRequests } = useContext(RequestsContext);

  const addRequest = async (newRequest: NewRequest) => {
    try {
      const dbRequest = await addDoc(
        collection(db, `${import.meta.env.VITE_APP_COMPANY_BRANCH}-requests`),
        newRequest
      );

      setRequests([...requests!, { id: dbRequest.id, ...newRequest }]);
    } catch {
      console.log("deu Erro");
    }
  };

  const getLastOs = async () => {
    const snapshot = await getDocs(collection(db, "requests"));

    let lastOs = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      data.os > lastOs && (lastOs = data.os);
    });

    return lastOs as number;
  };

  const updateRequest = async (update: IRequest) => {
    await setDoc(doc(db, `${import.meta.env.VITE_APP_COMPANY_BRANCH}-requests`, update.id), { ...update });

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

  return { requests, addRequest, getLastOs, updateRequest };
};

export default useRequests;
