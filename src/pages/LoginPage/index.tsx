import { FormEvent, useState } from "react";

import useAuth from "../../hooks/useAuth";

import PasswordInput from "../../components/PasswordInput";

import Container from "./styles";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(user, password);
  };

  return (
    <Container onSubmit={onSubmit}>
      <div className="form-items-container">
        <div className="form-row">
          <label>Email:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Senha:</label>
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <button type="submit">Entrar</button>
      </div>
    </Container>
  );
};

export default LoginPage;
