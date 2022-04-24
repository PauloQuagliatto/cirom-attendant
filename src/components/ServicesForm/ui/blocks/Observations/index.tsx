import ObservationCheckBox from "../../components/ObservationCheckBox";
import ObservationInput from "../../components/ObservationInput";

import Container from "./styles";

interface IProps {
  cartId: string;
  observations: string[];
}

const Observations = ({ cartId, observations }: IProps) => {
  return (
    <Container>
      {observations.map((observation, index) => {
        let isIn = false;
        observation ? (
          <div key={index}>
            <ObservationCheckBox isIn={isIn} cartId={cartId} />
          </div>
        ) : (
          <div key={index}>
            <ObservationInput
              cartId={cartId}
              incomingObservation={observation}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default Observations;
