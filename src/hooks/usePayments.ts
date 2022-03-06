import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { IPayment } from "../../types";

const usePayments = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);

  const getPayments = async () => {
    const querySnapshot = await getDocs(collection(db, "paymentMethods"));

    const dbPayments: any = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const dbPayment = {
        id: doc.id,
        ...data,
      };

      dbPayments.push(dbPayment);
    });

    setPayments(dbPayments as IPayment[]);
  };

  return { payments, getPayments };
};

export default usePayments;
