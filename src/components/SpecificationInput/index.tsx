import { useState } from "react";

interface IProps {
  preSpecification?: string;
}

const SpecificationInput = ({ preSpecification }: IProps) => {
  const [specification, setSpecification] = useState(
    preSpecification ? preSpecification : ""
  );
  return (
    <>
      <input
        value={specification}
        onChange={(e) => setSpecification(e.target.value)}
      />
    </>
  );
};
export default SpecificationInput;
