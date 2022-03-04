import Modal from "react-modal";

import Spinner from "./styles";

interface ISpinnerModal {
  isOpen: boolean;
}

const SpinnerModal = ({ isOpen }: ISpinnerModal) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        return;
      }}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-spinner"
      ariaHideApp={false}
    >
      <Spinner />
    </Modal>
  );
};

export default SpinnerModal;
