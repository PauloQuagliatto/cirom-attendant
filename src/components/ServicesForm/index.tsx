import { useEffect, useState } from "react";

import useServices from "../../hooks/useServices";

import { IService } from "../../../types";

import { Container, ServiceInfo } from "./styles";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import SpinnerModal from "../SpinnerModal";

interface IRequestService extends IService {
  status: string;
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

  const checkSelectedServices = (service: IService) => {
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
      setServices([...selectedServices, { ...service, status: "faltando" }]);
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
                className="service-info"
                isSelected={isSelected}
              >
                <div className="check-wrapper">
                  <div
                    className="check-button"
                    onClick={() => checkSelectedServices(service)}
                  ></div>
                  <h3>{service.name}</h3>
                </div>
                <h3>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(service.price)}
                </h3>
              </ServiceInfo>
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
