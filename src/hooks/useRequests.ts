import { useContext } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { RequestsContext } from "../context/RequestsContext";
import { db } from "../services/firebase";

import { IRequest } from "../../types";

const useAuth = () => {
  const { requests, setRequests } = useContext(RequestsContext);
  const requestsRef = collection(db, "requests");

  const addRequest = async (request: IRequest) => {
    const dbRequest = await setDoc(doc(requestsRef), request);
    console.log(dbRequest);
    setRequests([...requests!]);
  };
  return { requests };
};

export default useAuth;
