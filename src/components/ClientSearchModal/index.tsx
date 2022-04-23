import { useEffect, useState } from "react";
import Modal from "react-modal";

import useClients from "../../hooks/useClients";

import SpinnerModal from "../SpinnerModal";

import { IClient } from "../../../types";
import { IoMdClose } from "react-icons/io";

import Container from "./styles";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setResult: (client: IClient) => void;
}
const ClientSearchModal = ({ isOpen, setIsOpen, setResult }: IProps) => {
  const { clients, getClients } = useClients();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const loadingAnimation = async () => {
    setIsLoading(true);
    await getClients();
    setIsLoading(false);
  };

  useEffect(() => {
    isOpen && loadingAnimation();
  }, [isOpen]);

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const chooseClient = (client: IClient) => {
    setResult(client);
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
          <label>Digite Nome/CPF:</label>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
          <div className="clients-wrapper">
            {clients.map((client) => {
              if (
                client.cpf.includes(searchValue) ||
                client.name.toLowerCase().includes(searchValue)
              ) {
                return (
                  <div key={client.id} className="client-info" onClick={() => chooseClient(client)}>
                    <h3>{client.cpf}</h3>
                    <h3>{client.name}</h3>
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
