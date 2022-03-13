import { useState, useEffect } from "react";

import useClients from "../../hooks/useClients";

import { IClient } from "../../../types";

interface IProps {
  clientId: string;
}

const RequestPatientInfo = ({ clientId }: IProps) => {
  const { getClient } = useClients();
  const [client, setClient] = useState<IClient>(Object);

  const getAndSetClient = async () => {
    const dbClient = await getClient(clientId);

    setClient(dbClient);
  };

  useEffect(() => {
    getAndSetClient();
  }, []);

  return (
    <div>
      <h3>Nome: {client.name}</h3>
      <h3>Telefone: {client.phone}</h3>
      <h3>Celular: {client.cellphone}</h3>
    </div>
  );
};

export default RequestPatientInfo;
