import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

import Form from "./styles";
import UserForm from "../UserForm";
import DentistForm from "../DentistForm";
import ServicesForm from "../ServicesForm";
import PaymentsForm from "../PaymentsForm";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateRequestModal = ({ isOpen, setIsOpen }: IProps) => {
  const onRequestClose = () => {
    setIsOpen(false);
  };

  const searchClient = () => {
    return;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <UserForm increaseStep={increaseStep} />
        <DentistForm increaseStep={increaseStep} />
        <ServicesForm increaseStep={increaseStep} />
        <PaymentsForm onSubmit={onSubmit} />
      </Form>
    </Modal>
  );
};

export default CreateRequestModal;
