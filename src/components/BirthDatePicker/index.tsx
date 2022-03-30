import { InputHTMLAttributes } from "react";
import moment, { Moment } from "moment";
import Container from "./styles";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  birthDate: Moment;
  setBirthDate: (birthdate: Moment) => void;
}

const BirthDatePicker = ({ birthDate, setBirthDate }: IProps) => {
  const years = moment().diff(birthDate, "years");
  const months = moment().diff(birthDate, "months") - years * 12;

  return (
    <Container>
      <label>Data:</label>
      <input
        lang="pt-br"
        type="date"
        value={birthDate ? birthDate.format("YYYY-MM-DD") : ""}
        onChange={(e) => setBirthDate(moment(e.target.value))}
      />
      <label>
        Idade: {years} Anos e {months} meses
      </label>
    </Container>
  );
};

export default BirthDatePicker;
