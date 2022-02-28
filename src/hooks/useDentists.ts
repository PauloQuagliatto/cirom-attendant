import { useContext } from "react";

import { DentistsContext } from "../context/DentistsContext";

const useDentists = () => {
  const { dentists, setDentists } = useContext(DentistsContext);
};

export default useDentists;
