import { useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";

import Header from "../../components/Header";
import CreateRequestModal from '../../components/CreateRequestModal';
import RequestsList from "../../components/RequestsList";

import Container from "./styles";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header />
      <Container>
        <div className="dashboard-wrapper">
          <h1>Pedidos</h1>
          <button onClick={() => setIsOpen(true)}>
            <HiOutlineUserAdd fontSize="1.8rem" />
          </button>
        </div>
        <RequestsList />
      </Container>
      <CreateRequestModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Dashboard;
