import { useEffect, useState } from "react";
import Modal from "react-modal";

import useClients from "../../hooks/useClients";

import SpinnerModal from "../SpinnerModal";

import { IClient } from "../../../types";
import { IoMdClose } from "react-icons/io";

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
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        />
        {clients.map((client) => {
          if (
            client.cpf.includes(searchValue) ||
            client.name.toLowerCase().includes(searchValue)
          ) {
            return (
              <div key={client.id} onClick={() => chooseClient(client)}>
                <h3>{client.cpf}</h3>
                <h3>{client.name}</h3>
              </div>
            );
          }
        })}
      </Modal>
      <SpinnerModal isOpen={isLoading} />
    </>
  );
};

export default ClientSearchModal;
