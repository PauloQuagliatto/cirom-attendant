import { FormEvent, useState } from "react";

import useAuth from "../../hooks/useAuth";

import PasswordInput from "../../components/PasswordInput";

import Container from "./styles";

const LoginPage = () => {
  const { handleLogin } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(userName, password);
  };

  return (
    <Container onSubmit={onSubmit}>
      <div className="form-items-container">
        <div className="form-row">
          <label>Usuário:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value.toUpperCase())}
          />
        </div>
        <div className="form-row">
          <label>Senha:</label>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            width={"78%"}
          />
        </div>
        <button type="submit">Entrar</button>
      </div>
    </Container>
  );
};

export default LoginPage;
