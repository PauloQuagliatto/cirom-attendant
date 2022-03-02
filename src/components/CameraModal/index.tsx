import Modal from "react-modal";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CameraModal = ({ isOpen, setIsOpen }: IProps) => {
  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleTakePhoto = (dataUri: string) => {
    try {
      onRequestClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Camera
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        isImageMirror={false}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </Modal>
  );
};

export default CameraModal;
