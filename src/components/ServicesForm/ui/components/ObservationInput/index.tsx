import { useState } from "react";
import useServiceCart from "../../../../../hooks/useServiceCart";

interface IProps {
  cartId: string;
  incomingObservation: string;
}

const ObservationInput = ({ cartId, incomingObservation }: IProps) => {
  const { addNewObservation } = useServiceCart();
  const [observation, setObservation] = useState(incomingObservation);

  return (
    <>
      <input
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        onBlur={() => addNewObservation(cartId, observation)}
      />
    </>
  );
};
export default ObservationInput;
