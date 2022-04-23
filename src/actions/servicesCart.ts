import { IServiceCart } from "../../types";

export const addService = (service: IServiceCart) => ({
  type: "ADD_SERVICE",
  service,
});

export const removeService = (id: string) => ({
  type: "REMOVE_SERVICE",
  id,
});

export const updateService = (id: string, updates: IServiceCart) => ({
  type: "UPDATE_SERVICE",
  id,
  updates,
});

export const getServices = () => ({
  type: "GET_SERVICES",
});
