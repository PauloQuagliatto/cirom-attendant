export interface IClient {
  id: string;
  name: string;
  cpf: string;
  birthdate: number;
  momName?: string;
  dadName?: string;
  cellphone: string;
  phone: string;
  email: string;
  address: {
    zip: string;
    street: string;
    addressNumber: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
  };
}

export interface IDentist {
  id: string;
  name: string;
  cro: string;
  email: string;
  phone: string;
  address: {
    zip: string;
    street: string;
    addressNumber: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
  };
  region: string;
  discount: number;
}

export interface IPayment {
  id: string;
  name: string;
}

export interface IRequest {
  id: string;
  os: number;
  clientId: string;
  services: {
    id: string;
    name: string;
    price: number;
    status: string;
    observation: string;
    quantity: number;
  }[];
  dentistId: string;
  convenantId?: string;
  paymentMethods: {
    paymentMethodId: string;
    amount: number;
  }[];
  attendantId: string;
  status: string;
  createdAt: number;
}

export interface IService {
  id: string;
  name: string;
  price: number;
}

export interface IUser {
  id: string;
  name: string;
  userName: string;
}
