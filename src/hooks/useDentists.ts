import { useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { IDentist } from "../../types";

type NewDentist = Omit<IDentist, "id">;

const useDentists = () => {
  const [dentists, setDentists] = useState<IDentist[]>([]);

  const getDentists = async () => {
    const querySnapshot = await getDocs(collection(db, "dentists"));

    const dbDentists: any = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dbDentist = {
        id: doc.id,
        ...data,
      };

      dbDentists.push(dbDentist);
    });

    setDentists(dbDentists as IDentist[]);
  };

  const getDentist = async (id: string) => {
    const docRef = doc(db, "dentists", id);
    const dbDoc = await getDoc(docRef);

    const data = dbDoc.data();

    let dbDentist: any = {
      id,
      ...data,
    };

    console.log(dbDentist);

    return dbDentist as IDentist;
  };

  const addDentist = async (dentist: NewDentist) => {
    const dbDentist = await addDoc(collection(db, "dentists"), dentist);
    const newDentist = { id: dbDentist.id, ...dentist };
    setDentists([...dentists!, newDentist]);

    return newDentist.id;
  };

  return { dentists, getDentist, getDentists, addDentist };
};

export default useDentists;
