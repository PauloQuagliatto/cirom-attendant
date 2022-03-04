import { InputHTMLAttributes } from "react";
import moment from "moment";
import Container from "./styles";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  birthdate: number;
  setBirthdate: (birthdate: number) => void;
}

const DatePicker = ({ birthdate, setBirthdate }: IProps) => {
  const years = moment().diff(birthdate, "years");

  return (
    <Container>
      <label>Data:</label>
      <input
        type="date"
        onChange={(e) =>
          setBirthdate(moment(e.target.value, "YYYY-MM-DD").valueOf())
        }
      />
      <label>Idade: {years} Anos</label>
    </Container>
  );
};

export default DatePicker;
