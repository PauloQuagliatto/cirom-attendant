import { useState } from "react";
import { v4 as uuid } from "uuid";

import { IService } from "../../../../../types";
import ObservationInput from "../../../ObservationInput";

import Container from "./styles";

interface IRequestService extends IService {
  status: string;
}
interface IProps {
  service: IService;
  checkSelectedServices: (service: IService) => void;
  isSelected: boolean;
  setChosenServices: (services: IRequestService[]) => void;
}

const ServiceInfo = ({
  service,
  checkSelectedServices,
  isSelected,
  setChosenServices,
}: IProps) => {
  const [observations, setObservations] = useState<any[]>([]);
  console.log(service);

  const addOrRemoveService = (service: IService) => {
    let hasService = false;

    chosenServices.map(({ id }) => {
      id === service.id && (hasService = true);
    });

    if (hasService) {
      const newServices = chosenServices.filter(
        ({ id }) => id !== service.id
      );
      setChosenServices(newServices);
    } else {
      service.hasObservation
        ? setChosenServices([
            ...chosenServices,
            {
              ...service,
              status: "faltando",
              observation: "",
            },
          ]);
          setObservations([])
        : setChosenServices([
            ...chosenServices,
            {
              ...service,
              status: "faltando",
            },
          ]);
    }
  };

  const addObservation = (observation: string) => {
    setObservations([...observations, observation]);
  };

  return (
    <Container className="service-info" isSelected={isSelected}>
      <div className="check-wrapper">
        <div
          className="check-button"
          onClick={() => addOrRemoveService(service)}
        ></div>
        {isSelected && (
          <button
            onClick={() => {
              return;
            }}
          >
            {" "}
            +{" "}
          </button>
        )}
        <h3>{service.name}</h3>
        {isSelected && (
          <button
            onClick={() => {
              return;
            }}
          >
            {" "}
            -{" "}
          </button>
        )}
      </div>
      <h3>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(service.price)}
      </h3>
      {isSelected &&
        service.hasObservation &&
        observations.map((observation, index) => {
          return (
            <div key={index}>
              <ObservationInput addObservation={addObservation} />
            </div>
          );
        })}
    </Container>
  );
};

export default ServiceInfo;
