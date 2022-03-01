import RequestItem from "../RequestItem";

import useRequests from "../../hooks/useRequests";

import Container from "./styles";

const RequestsList = () => {
  const { requests } = useRequests();
  
  return (
    <Container>
      {requests &&
        requests.map((request) => {
          return <RequestItem key={request.id} request={request} />;
        })}
    </Container>
  );
};

export default RequestsList;
