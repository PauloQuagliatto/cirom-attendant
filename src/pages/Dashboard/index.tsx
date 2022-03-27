import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

import RequestsList from "../../components/RequestsList";

import Container from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <div className="dashboard-wrapper">
        <h1>Pedidos</h1>
        <button>
          <Link className="icon-link" to="/new-request">
            <HiOutlineUserAdd fontSize="1.8rem" />
          </Link>
        </button>
      </div>
      <RequestsList />
    </Container>
  );
};

export default Dashboard;
