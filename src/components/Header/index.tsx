import useAuth from "../../hooks/useAuth";

import Container from "./styles";

const Header = () => {
  const { user, handleLogout } = useAuth();
  alert(user!.name);
  return (
    <Container>
      <h1>{user!.name}</h1>
      <button onClick={handleLogout}>Sair</button>
    </Container>
  );
};

export default Header;
