import { InputHTMLAttributes } from "react";

import Container from "./styles";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value: any;
  onChangeFunction: (value: any) => void;
}

const LabeledInput = ({ title, value, onChangeFunction, ...rest }: IProps) => {
  return (
    <Container>
      <label>{title}:</label>
      <input
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        {...rest}
      />
    </Container>
  );
};

export default LabeledInput;
