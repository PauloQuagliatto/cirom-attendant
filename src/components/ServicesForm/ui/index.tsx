import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useServices from "../../../hooks/useServices";
import useServiceCart from "../../../hooks/useServiceCart";

import ServiceInfo from "./blocks/ServiceInfo";
import SpinnerModal from "../../SpinnerModal";

import { IService, IServiceCart } from "../../../../types";

import Container from "./styles";

interface IProps {
  decreaseStep: () => void;
  increaseStep: () => void;
  servicesCart: IServiceCart[];
}

const ServicesForm = ({ decreaseStep, increaseStep, servicesCart }: IProps) => {
  const { services, getServices } = useServices();
  const [isLoading, setIsLoading] = useState(false);

  let total = 0;

  servicesCart.forEach((service) => {
    total += service.price;
  });

  const loadingAnimation = async () => {
    setIsLoading(true);
    await getServices();
    setIsLoading(false);
  };

  useEffect(() => {
    loadingAnimation();
  }, []);

  const checkAndNextStep = () => {
    if (servicesCart.length > 0) {
      increaseStep();
    }
  };

  return (
    <>
      <Container>
        <div className="services-wrapper">
          {services.map((service) => {
            let isSelected = false;
            servicesCart.map(
              ({ id }) => id === service.id && (isSelected = true)
            );

            return (
              <ServiceInfo
                key={service.id}
                service={service}
                isSelected={isSelected}
              />
            );
          })}
        </div>
        <div className="vertical-separator"></div>
        <h2>
          Total:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </h2>
        <div className="bottom-navigation">
          <div className="functional-icon" onClick={decreaseStep}>
            <MdOutlineKeyboardArrowLeft color="black" fontSize="1.3em" />
          </div>
          <div className="functional-icon" onClick={checkAndNextStep}>
            <MdOutlineKeyboardArrowRight color="black" fontSize="1.3em" />
          </div>
        </div>
      </Container>
      <SpinnerModal isOpen={isLoading} />
    </>
  );
};

export default ServicesForm;
