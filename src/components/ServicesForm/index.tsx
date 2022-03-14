import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useServices from "../../hooks/useServices";

import ServiceInfo from "../ServiceInfo";
import SpinnerModal from "../SpinnerModal";

import { IService } from "../../../types";

import Container from "./styles";

interface IRequestService extends IService {
  status: string;
  specifications: string[];
  quantity: number;
}

interface IProps {
  decreaseStep: () => void;
  increaseStep: () => void;
  selectedServices: IRequestService[];
  setServices: (services: IRequestService[]) => void;
}

const ServicesForm = ({
  decreaseStep,
  increaseStep,
  selectedServices,
  setServices,
}: IProps) => {
  const { services, getServices } = useServices();
  const [isLoading, setIsLoading] = useState(false);

  let total = 0;

  selectedServices.forEach((service) => {
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

  const checkSelectedServices = (
    service: IService,
    specifications: string[],
    quantity: number
  ) => {
    let hasService = false;

    selectedServices.map(({ id }) => {
      id === service.id && (hasService = true);
    });

    if (hasService) {
      const newServices = selectedServices.filter(
        ({ id }) => id !== service.id
      );
      setServices(newServices);
    } else {
      const { price, ...serviceRest } = service;
      setServices([
        ...selectedServices,
        {
          ...serviceRest,
          status: "faltando",
          specifications,
          quantity,
          price: price * quantity,
        },
      ]);
    }
  };

  const checkAndNextStep = () => {
    if (selectedServices.length > 0) {
      increaseStep();
    }
  };

  return (
    <>
      <Container>
        <div className="services-wrapper">
          {services.map((service) => {
            let isSelected = false;
            selectedServices.map(
              ({ id }) => id === service.id && (isSelected = true)
            );

            return (
              <ServiceInfo
                key={service.id}
                service={service}
                isSelected={isSelected}
                checkSelectedServices={checkSelectedServices}
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
