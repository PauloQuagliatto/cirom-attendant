import { FormEvent, useState } from "react";

import PasswordInput from "../../components/PasswordInput";

import Container from "./styles";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container onSubmit={onSubmit}>
      <div className="form-items-container">
        <div className="form-row">
          <label>Usuário:</label>
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
