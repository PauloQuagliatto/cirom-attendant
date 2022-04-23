import { useState, useEffect } from "react";

import useDentists from "../../hooks/useDentists";

import { IDentist } from "../../../types";

interface IProps {
  dentistId: string;
}

const RequestDentistInfo = ({ dentistId }: IProps) => {
  const { getDentist } = useDentists();
  const [dentist, setDentist] = useState<IDentist>(Object);

  const getAndSetDentist = async () => {
    const dbDentist = await getDentist(dentistId);

    setDentist(dbDentist);
  };

  useEffect(() => {
    getAndSetDentist();
  }, []);

  return (
    <div>
      <h3>Nome: {dentist.name}</h3>
      <h3>Telefone: {dentist.phone}</h3>
      <h3>Celular: {dentist.email}</h3>
    </div>
  );
};

export default RequestDentistInfo;
