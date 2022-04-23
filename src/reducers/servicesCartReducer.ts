import { IServiceCart } from "../../types";


interface IAction {
  type: string;
  service: IServiceCart;
  id: string;
  updates: any;
}

const initialState: IServiceCart[] = [];

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case "ADD_SERVICE":
      return [...state, action.service];
    case "REMOVE_SERVICE":
      return state.filter(({ id }) => id !== action.id);
    case "UPDATE_SERVICE":
      return state.map((service) => {
        service.id === action.id
          ? {
              ...service,
              ...action.updates,
            }
          : service;
      });
    default:
      return state;
  }
};
