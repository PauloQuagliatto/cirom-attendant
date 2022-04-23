import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import usePayments from "../../hooks/usePayments";

import { IPayment } from "../../../types";

import { Container, PaymentInfo } from "./styles";
import SpinnerModal from "../SpinnerModal";

interface IRequestPayment extends IPayment {
  amount: number;
}

interface IProps {
  decreaseStep: () => void;
  selectedPayments: IRequestPayment[];
  setPayments: (payments: IRequestPayment[]) => void;
}

const PaymentsForm = ({
  decreaseStep,
  selectedPayments,
  setPayments,
}: IProps) => {
  const { payments, getPayments } = usePayments();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const loadingAnimation = async () => {
    setIsLoading(true);
    await getPayments();
    setIsLoading(false);
  };

  useEffect(() => {
    loadingAnimation();
  }, []);

  const handlePriceValueChange = (e: any) => {
    if (e.target.value) {
      const number = e.target.value.replace(/\D/g, "");
      const actualValue = parseFloat(number) / 100;

      setAmount(actualValue);
    } else {
      setAmount(0);
    }
  };

  const checkSelectedPayments = (payment: IPayment) => {
    let hasPayment = false;

    selectedPayments.map(({ id }) => {
      id === payment.id && (hasPayment = true);
    });

    if (hasPayment) {
      const newpayments = selectedPayments.filter(
        ({ id }) => id !== payment.id
      );
      setPayments(newpayments);
    } else {
      setPayments([...selectedPayments, { ...payment, amount }]);
      setAmount(0);
    }
  };

  return (
    <>
      <Container>
        {payments.map((payment) => {
          let isSelected = false;
          selectedPayments.map(
            ({ id }) => id === payment.id && (isSelected = true)
          );

          <input
            value={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          />;
          return (
            <PaymentInfo
              key={payment.id}
              className="payment-info"
              isSelected={isSelected}
            >
              <div
                className="check-button"
                onClick={() => checkSelectedPayments(payment)}
              ></div>
              <h3>{payment.name}</h3>
            </PaymentInfo>
          );
        })}
        <div className="bottom-navigation">
          <div className="functional-icon" onClick={decreaseStep}>
            <MdOutlineKeyboardArrowLeft color="black" fontSize="1.3em" />
          </div>
          <button type="submit">Finalizar</button>
        </div>
      </Container>
      <SpinnerModal isOpen={isLoading} />
    </>
  );
};

export default PaymentsForm;
