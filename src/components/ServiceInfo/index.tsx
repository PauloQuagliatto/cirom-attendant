import { useState } from "react";

import { IService } from "../../../types";

import Container from "./styles";

interface IProps {
  service: IService;
  checkSelectedServices: (
    service: IService,
    observation: string,
    quantity: number
  ) => void;
  isSelected: boolean;
}

const ServiceInfo = ({
  service,
  checkSelectedServices,
  isSelected,
}: IProps) => {
  const [observation, setObservation] = useState("");
  const [quantity, setQuantity] = useState(0);
  return (
    <Container className="service-info" isSelected={isSelected}>
      <div className="check-wrapper">
        <div
          className="check-button"
          onClick={() => checkSelectedServices(service, observation, quantity)}
        ></div>
        <h3>{service.name}</h3>
      </div>
      <h3>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(service.price)}
      </h3>
      <input
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
      />
      {isSelected && (
        <div>
          <button onClick={() => setQuantity(quantity + 1)}> + </button>
          <h4>{quantity}</h4>
          <button onClick={() => setQuantity(quantity - 1)}> - </button>
        </div>
      )}
    </Container>
  );
};

export default ServiceInfo;
