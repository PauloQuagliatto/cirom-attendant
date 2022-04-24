import useServiceCart from "../../../../../hooks/useServiceCart";

import Observations from "../Observations";

import { IService, IServiceCart } from "../../../../../../types";

import Container from "./styles";

interface IProps {
  service: IService | IServiceCart;
  isSelected: boolean;
}

const ServiceInfo = ({ service, isSelected }: IProps) => {
  const { checkServiceCart, addToCart, removeFromCart } = useServiceCart();
  return (
    <Container className="service-info" isSelected={isSelected}>
      <div className="check-wrapper">
        <div
          className="check-button"
          onClick={() => checkServiceCart(service)}
        ></div>
        {isSelected && (
          <button
            onClick={() => {
              addToCart(service);
            }}
          >
            +
          </button>
        )}
        <h3>{service.name}</h3>
        {isSelected && (
          <button
            onClick={() => {
              removeFromCart(service.id);
            }}
          >
            -
          </button>
        )}
      </div>
      <h3>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(service.price)}
      </h3>
      {isSelected && (
        <Observations
          cartId={service.cartId}
          observations={service.observations}
        />
      )}
    </Container>
  );
};

export default ServiceInfo;
