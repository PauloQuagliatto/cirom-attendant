import { createContext, ReactNode, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { IDentist } from "../../types";

interface IContext {
  dentists: IDentist[] | null;
  setDentists: (dentists: IDentist[] | null) => void;
}
const DentistsContext = createContext({} as IContext);

interface IProps {
  children: ReactNode;
}
const DentistsProvider = ({ children }: IProps) => {
  const [dentists, setDentists] = useState<IDentist[] | null>(null);

  const getClients = async () => {
    const querySnapshot = await getDocs(collection(db, "dentists"));

    const dbDentists: any = [];

    querySnapshot.forEach((doc) => {
        dbDentists.push(doc.data());
    });

    setDentists(dbDentists as IDentist[]);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <DentistsContext.Provider value={{ dentists, setDentists }}>
      {children}
    </DentistsContext.Provider>
  );
};

export { DentistsContext, DentistsProvider };
