import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Container from "./styles";

interface IProps {
  password: string;
  setPassword: (password: string) => void;
  width: string;
}

const PasswordInput = ({ password, setPassword, width }: IProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Container width={width}>
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div
        className="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? (
          <AiOutlineEyeInvisible fontSize="1.4rem" />
        ) : (
          <AiOutlineEye fontSize="1.4rem" />
        )}
      </div>
    </Container>
  );
};

export default PasswordInput;
