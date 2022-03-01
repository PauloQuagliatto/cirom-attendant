import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

interface IProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CreateRequestModal = ({
    isOpen,
    setIsOpen
}: IProps) => {
    const onRequestClose = () => {
        setIsOpen(false);
    }
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
        </Modal>
    )
}

export default CreateRequestModal;