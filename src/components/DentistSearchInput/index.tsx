import { InputHTMLAttributes, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ClientSearchModal from "../ClientSearchModal";

import Container from "./styles";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value: any;
  onChangeFunction: (value: any) => void;
  onSetFunction: (value: any) => void;
}

const SearchDentistInput = ({
  title,
  value,
  onChangeFunction,
  onSetFunction,
  ...rest
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container>
        <label>{title}:</label>
        <input
          value={value}
          onChange={(e) => onChangeFunction(e.target.value)}
          {...rest}
        />
        <div
          className="functional-icon no-background-change"
          onClick={() => setIsOpen(true)}
        >
          <BsSearch />
        </div>
      </Container>
      <ClientSearchModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setResult={onSetFunction}
      />
    </>
  );
};

export default SearchDentistInput;
