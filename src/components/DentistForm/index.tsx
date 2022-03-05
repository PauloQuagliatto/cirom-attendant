import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import LabeledInput from "../LabeledInput";
import DentistSearchInput from "../DentistSearchInput";

import { IDentist } from "../../../types";

import Container from "./styles";

interface IProps {
  decreaseStep: () => void;
  increaseStep: () => void;
}

const DentistForm = ({ decreaseStep, increaseStep }: IProps) => {
  const [dentist, setDentist] = useState<IDentist | null>();
  const [cro, setCro] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {}, [dentist]);
  return (
    <Container>
      <DentistSearchInput
        title={"CRO"}
        value={cro}
        onChangeFunction={setCro}
        onSetFunction={setDentist}
      />
      <LabeledInput title={"Nome"} value={name} onChangeFunction={setName} />
      <div className="bottom-navigation">
        <div className="functional-icon" onClick={decreaseStep}>
          <MdOutlineKeyboardArrowLeft color="black" fontSize="1.3em" />
        </div>
        <div className="functional-icon" onClick={increaseStep}>
          <MdOutlineKeyboardArrowRight color="black" fontSize="1.3em" />
        </div>
      </div>
    </Container>
  );
};

export default DentistForm;
