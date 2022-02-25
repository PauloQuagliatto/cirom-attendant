export interface IClient {
  id: string;
  name: string;
  cpf: string;
  cellphone: string;
  phone: string;
  email: string;
  address: {
    street: string;
    houseNumber: string;
    cep: string;
    city: string;
    uf: string;
    complement: string;
  };
};

export interface IRequest {
  clientId: string;
  services: {
    name: string;
    price: number;
  }[];
  dentistId: string;
  convenantId: string;
  payment: {
    method: string;
    amount: number;
  }[];
  attendantId: string;
};

export interface IUser {
  id: string;
  name: string;
  userName: string;
};
