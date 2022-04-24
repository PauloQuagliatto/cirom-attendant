import Container from "./styles";

interface IProps {
  cartId: string;
  isIn: boolean;
}

const ObservationCheckBox = ({ cartId, isIn }: IProps) => {
  return <Container isIn={isIn}></Container>;
};

export default ObservationCheckBox;
