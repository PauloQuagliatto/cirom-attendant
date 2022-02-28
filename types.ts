export interface IClient {
  id: string;
  name: string;
  cpf: string;
  cellphone: string;
  phone: string;
  email: string;
  address: {
    street: string;
    addressNumber: string;
    cep: string;
    city: string;
    uf: string;
    complement: string;
  };
}

export interface IDentist {
  id: string;
  name: string;
  cro: string;
  address: {
    street: string;
    addressNumber: string;
    cep: string;
    city: string;
    uf: string;
    complement: string;
  };
  region: string;
}

export interface IRequest {
  id: string;
  os: string;
  clientId: string;
  services: {
    serviceId: string;
    status: string;
  }[];
  dentistId: string;
  convenantId?: string;
  paymentMethods: {
    paymentMethodId: string;
    amount: number;
  }[];
  attendantId: string;
  status: string;
}

export interface IUser {
  id: string;
  name: string;
  userName: string;
}
