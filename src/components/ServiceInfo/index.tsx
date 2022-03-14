import { ChangeEvent, useState } from "react";

import { IService } from "../../../types";
import SpecificationInput from "../SpecificationInput";

import Container from "./styles";

interface IProps {
  service: IService;
  checkSelectedServices: (
    service: IService,
    specifications: string[],
    quantity: number
  ) => void;
  isSelected: boolean;
}

const ServiceInfo = ({
  service,
  checkSelectedServices,
  isSelected,
}: IProps) => {
  console.log(service.specifications);
  const [specifications, setSpecifications] = useState<string[]>(
    service.acceptSpecifications && service.specifications
      ? service.specifications
      : []
  );
  const [quantity, setQuantity] = useState(1);

  const checkSpecification = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecifications([...specifications, e.target.value]);
  };

  return (
    <Container className="service-info" isSelected={isSelected}>
      <div className="check-wrapper">
        <div
          className="check-button"
          onClick={() =>
            checkSelectedServices(service, specifications, quantity)
          }
        ></div>
        <h3>{service.name}</h3>
      </div>
      <h3>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(service.price)}
      </h3>
      {isSelected && service.acceptSpecifications && (
        <>
          <div className="buttons-container">
            <button onClick={() => setQuantity(quantity + 1)}> + </button>
            <button onClick={() => setQuantity(quantity - 1)}> - </button>
          </div>

          {specifications ? (
            specifications.map((specification, index) => {
              return (
                <div key={index}>
                  <SpecificationInput preSpecification={specification} />
                </div>
              );
            })
          ) : (
            <SpecificationInput />
          )}
        </>
      )}
    </Container>
  );
};

export default ServiceInfo;
