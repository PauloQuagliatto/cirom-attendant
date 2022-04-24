import { useState } from "react";
import { v4 as uuid } from "uuid";

import { IService, IServiceCart } from "../../types";

const useServiceCart = () => {
  const [serviceCart, setServiceCart] = useState<IServiceCart[]>([]);

  const checkServiceCart = (service: IService | IServiceCart) => {
    if (service.cartId) return removeFromCart(service.cartId);

    addToCart(service);
  };

  const addToCart = (service: IService) => {
    setServiceCart((currentState) => [
      ...currentState,
      { ...service, cartId: uuid(), status: "faltando" },
    ]);
  };

  const updateServiceCart = (cartId: string, updates: any) => {
    setServiceCart((currentState) => {
      return currentState.map((service) =>
        service.cartId === cartId ? { ...service, ...updates } : service
      );
    });
  };

  const removeFromCart = (cartId: string) => {
    setServiceCart((currentState) =>
      currentState.filter(({ cartId }) => cartId !== cartId)
    );
  };

  const addNewObservation = (cartId: string, newObservation: string) => {
    let observations: string[] = [];

    serviceCart.map(
      (serviceInCart) =>
        serviceInCart.cartId === cartId &&
        (observations = serviceInCart.observations)
    );

    observations.push(newObservation);

    updateServiceCart(cartId, { observations });
  };

  const removeObservation = (cartId: string, observation: string) => {
    let observations: string[] = [];

    serviceCart.map(
      (serviceInCart) =>
        serviceInCart.cartId === cartId &&
        (observations = serviceInCart.observations)
    );

    observations = observations.filter(
      (observationInService) => observation !== observationInService
    );

    updateServiceCart(cartId, { observations });
  };

  return {
    serviceCart,
    addToCart,
    checkServiceCart,
    updateServiceCart,
    removeFromCart,
    addNewObservation,
    removeObservation,
  };
};

export default useServiceCart;
