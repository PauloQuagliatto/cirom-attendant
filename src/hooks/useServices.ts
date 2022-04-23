import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { IService } from "../../types";

const useServices = () => {
  const [services, setServices] = useState<IService[]>([]);

  const getServices = async () => {
    const querySnapshot = await getDocs(collection(db, `${import.meta.env.VITE_APP_COMPANY_BRANCH}-services`));

    const dbServices: any = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dbService = {
        id: doc.id,
        ...data,
      };

      dbServices.push(dbService);
    });

    setServices(dbServices as IService[]);
  };

  return { services, getServices };
};

export default useServices;
