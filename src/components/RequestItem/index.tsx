import { useState } from "react";
import { MdAddPhotoAlternate, MdKeyboardArrowDown } from "react-icons/md";

import useImage from "../../hooks/useImage";

import RequestExtraInfo from "../RequestExtraInfo";

import { IRequest } from "../../../types";

import Container from "./styles";
import { useEffect } from "react";

interface IProps {
  request: IRequest;
}

const RequestItem = ({ request }: IProps) => {
  const { getProfileImage } = useImage();
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    getProfileImage(request.clientId);
  }, []);

  return (
    <Container>
      <div className="wrapper">
        <>
          {
            //<img src={`profile/${request.clientId}`} />
          }
        </>
        <MdAddPhotoAlternate color="#407ceb" fontSize="80px" />
        <h3>OS: {request.clientId}</h3>
        <div className="service-status"></div>
        <div className="functional-icon" onClick={() => setIsShowing(true)}>
          <MdKeyboardArrowDown fontSize="1.6rem" />
        </div>
      </div>
      <RequestExtraInfo request={request} isShowing={isShowing} />
    </Container>
  );
};

export default RequestItem;
