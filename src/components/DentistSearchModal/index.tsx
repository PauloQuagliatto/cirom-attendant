import { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

import useDentists from "../../hooks/useDentists";

import SpinnerModal from "../SpinnerModal";

import { IDentist } from "../../../types";

import Container from "./styles";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setResult: (dentist: IDentist) => void;
}
const ClientSearchModal = ({ isOpen, setIsOpen, setResult }: IProps) => {
  const { dentists, getDentists } = useDentists();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const loadingAnimation = async () => {
    setIsLoading(true);
    await getDentists();
    setIsLoading(false);
  };

  useEffect(() => {
    isOpen && loadingAnimation();
  }, [isOpen]);

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const chooseDentist = (dentist: IDentist) => {
    setResult(dentist);
    onRequestClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <IoMdClose color="black" fontSize="1.8em" />
        </button>
        <Container>
          <label>Digite Nome/CRO:</label>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
          <div className="dentists-wrapper">
            {dentists!.map((dentist) => {
              if (
                dentist.cro.includes(searchValue) ||
                dentist.name.toLowerCase().includes(searchValue)
              ) {
                return (
                  <div
                    key={dentist.id}
                    className="dentist-info"
                    onClick={() => chooseDentist(dentist)}
                  >
                    <h3>{dentist.cro}</h3>
                    <h3>{dentist.name}</h3>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Modal>
      <SpinnerModal isOpen={isLoading} />
    </>
  );
};

export default ClientSearchModal;
