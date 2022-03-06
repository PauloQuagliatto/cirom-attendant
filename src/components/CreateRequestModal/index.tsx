import { FormEvent, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { IoMdClose } from "react-icons/io";

import useAuth from "../../hooks/useAuth";
import useRequests from "../../hooks/useRequests";

import ClientForm from "../ClientForm";
import DentistForm from "../DentistForm";
import ServicesForm from "../ServicesForm";
import PaymentsForm from "../PaymentsForm";

import { IPayment, IService } from "../../../types";

import Form from "./styles";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface IRequestService extends IService {
  status: string;
}

interface IRequestPayment extends IPayment {
  amount: number;
}

const CreateRequestModal = ({ isOpen, setIsOpen }: IProps) => {
  const { user } = useAuth();
  const { requests, addRequest, getLastOs } = useRequests();
  const [step, setStep] = useState(1);
  const [clientId, setClientId] = useState("");
  const [dentistId, setDentistId] = useState("");
  const [services, setServices] = useState<IRequestService[]>([]);
  const [payments, setPayments] = useState<IRequestPayment[]>([]);

  const increaseStep = () => {
    setStep(step + 1);
  };

  const decreaseStep = () => {
    setStep(step - 1);
  };

  const onRequestClose = () => {
    setStep(1);
    setClientId("");
    setDentistId("");
    setServices([]);
    setPayments([]);
    setIsOpen(false);
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
      services,
      dentistId,
      paymentMethods: payments,
      attendantId: user!.id,
      status: "criado",
      createdAt: moment().valueOf(),
    };

    //addRequest(newRequest);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <IoMdClose color="black" fontSize="1.8em" />
      </button>
      <Form onSubmit={onSubmit}>
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
            selectedServices={services}
            setServices={setServices}
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
    </Modal>
  );
};

export default CreateRequestModal;
