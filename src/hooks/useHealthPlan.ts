import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { IHealthPlan } from "../../types";

type ActiveHealthPlan = Omit<IHealthPlan, "isActive">;

const useHealthPlan = () => {
  const [healthPlans, setHealthPlans] = useState<ActiveHealthPlan[]>([]);

  const getHealthPlan = async () => {
    const querySnapshot = await getDocs(collection(db, "health-plans"));

    const dbHealthPlans: ActiveHealthPlan[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      if (data.isActive) {
        const dbHealthPlan = {
          id: doc.id,
          name: data.name,
        };
        dbHealthPlans.push(dbHealthPlan);
      }
    });

    setHealthPlans(dbHealthPlans);
  };

  return { healthPlans, getHealthPlan };
};

export default useHealthPlan;
