import { useState } from "react";

interface IProps {
  addObservation: (observation: string) => void;
}

const ObservationInput = ({ addObservation }: IProps) => {
  const [observation, setObservation] = useState("");
  
  return (
    <>
      <input
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
        onBlur={() => addObservation(observation)}
      />
    </>
  );
};
export default ObservationInput;
