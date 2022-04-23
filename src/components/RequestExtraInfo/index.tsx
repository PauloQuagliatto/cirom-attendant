import { useState } from "react";

import RequestPatientInfo from "../RequestPatientInfo";
import RequestDentistInfo from "../RequestDentistInfo";

import { IRequest } from "../../../types";

interface IProps {
  isShowing: boolean;
  request: IRequest;
}
const RequestExtraInfo = ({ isShowing, request }: IProps) => {
  const [infoPage, setInfoPage] = useState(1);
  return (
    <>
      {isShowing && (
        <div>
          {infoPage === 1 && <RequestPatientInfo clientId={request.clientId} />}
          {infoPage === 2 && (
            <RequestDentistInfo dentistId={request.dentistId} />
          )}
          {infoPage === 3 && (
            <RequestDentistInfo dentistId={request.dentistId} />
          )}
          {infoPage === 4 && (
            <RequestDentistInfo dentistId={request.dentistId} />
          )}
        </div>
      )}
    </>
  );
};

export default RequestExtraInfo;
