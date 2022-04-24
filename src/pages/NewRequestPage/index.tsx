import { FormEvent, useState } from "react";
import moment from "moment";

import useAuth from "../../hooks/useAuth";
import useRequests from "../../hooks/useRequests";
import useServiceCart from "../../hooks/useServiceCart";

import ClientForm from "../../components/ClientForm";
import DentistForm from "../../components/DentistForm";
import ServicesForm from "../../components/ServicesForm/ui";
import PaymentsForm from "../../components/PaymentsForm";

import { IPayment, IServiceCart } from "../../../types";

import Form from "./styles";
import { useNavigate } from "react-router-dom";

interface IRequestPayment extends IPayment {
  amount: number;
}

const NewRequestPage = () => {
  const { user } = useAuth();
  const { requests, addRequest, getLastOs } = useRequests();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [clientId, setClientId] = useState("");
  const [dentistId, setDentistId] = useState("");
  const { servicesCart } = useServiceCart;
  const [payments, setPayments] = useState<IRequestPayment[]>([]);

  const increaseStep = () => {
    setStep(step + 1);
  };

  const decreaseStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let newOs = 0;
    if (requests) {
      requests!.map(({ os }) => {
        os > newOs && (newOs = os);
      });
    } else {
      newOs = await getLastOs();
    }

    const newRequest = {
      os: newOs + 1,
      clientId,
      servicesCart,
      dentistId,
      paymentMethods: payments,
      attendantId: user!.id,
      status: "criado",
      createdAt: moment().valueOf(),
    };

    console.log(newRequest);
    //addRequest(newRequest);
    //navigate("/dashboard");
  };

  return (
    <Form onSubmit={onSubmit} lang="pt-br">
      {step === 1 && (
        <ClientForm
          increaseStep={increaseStep}
          clientId={clientId}
          setClientId={setClientId}
        />
      )}
      {step === 2 && (
        <DentistForm
          decreaseStep={decreaseStep}
          increaseStep={increaseStep}
          dentistId={dentistId}
          setDentistId={setDentistId}
        />
      )}
      {step === 3 && (
        <ServicesForm
          decreaseStep={decreaseStep}
          increaseStep={increaseStep}
          servicesCart={servicesCart}
        />
      )}
      {step === 4 && (
        <PaymentsForm
          decreaseStep={decreaseStep}
          selectedPayments={payments}
          setPayments={setPayments}
        />
      )}
    </Form>
  );
};

export default NewRequestPage;
