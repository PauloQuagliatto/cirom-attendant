import { useEffect, useRef } from "react";
import Modal from "react-modal";
import { MdPhotoCamera } from "react-icons/md";

import Container from "./styles";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setImagePreviewUrl: (dataUri: string) => void;
}

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: "environment",
    aspectRatio: 4 / 3,
  },
};

const CameraModal = ({ isOpen, setIsOpen, setImagePreviewUrl }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS).then((stream) => {
      let video = videoRef.current;
      video!.srcObject = stream;
      video!.play();
    });
  };

  const endVideo = () => {
    navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS).then((stream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    });
  };

  useEffect(() => {
    if (isOpen) {
      startVideo();
    }

    return () => {
      endVideo();
    }
  }, [isOpen, videoRef]);

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleTakePhoto = async () => {
    let photo = photoRef.current;
    let video = videoRef.current;

    const height = video!.offsetHeight;
    const width = video!.offsetWidth;

    photo!.width = width;
    photo!.height = height;

    const context = photo!.getContext("2d");

    context!.drawImage(video!, 0, 0, width!, height!);

    const imageSrc = photo!.toDataURL();
    setImagePreviewUrl(imageSrc);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <Container>
        <video ref={videoRef}></video>
        <div id="photo-button" onClick={handleTakePhoto}>
          <MdPhotoCamera fontSize="1.5rem" />
        </div>
        <canvas ref={photoRef} width="100%" height="100%"></canvas>
      </Container>
    </Modal>
  );
};

export default CameraModal;
