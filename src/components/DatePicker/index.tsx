import { InputHTMLAttributes } from "react";
import moment, { Moment } from "moment";
import Container from "./styles";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  birthdate: Moment;
  setBirthdate: (birthdate: Moment) => void;
}

const DatePicker = ({ birthdate, setBirthdate }: IProps) => {
  const years = moment().diff(birthdate, "years");
  
  return (
    <Container>
      <label>Data:</label>
      <input
        type="date"
        value={birthdate ? birthdate.format("YYYY-MM-DD") : ""}
        onChange={(e) => setBirthdate(moment(e.target.value))}
      />
      <label>Idade: {years} Anos</label>
    </Container>
  );
};

export default DatePicker;
