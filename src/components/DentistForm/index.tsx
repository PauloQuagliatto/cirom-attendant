import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useDentists from "../../hooks/useDentists";

import LabeledInput from "../LabeledInput";
import DentistSearchInput from "../DentistSearchInput";

import { IDentist } from "../../../types";

import Container from "./styles";

interface IProps {
  decreaseStep: () => void;
  increaseStep: () => void;
  dentistId: string;
  setDentistId: (id: string) => void;
}

const DentistForm = ({
  decreaseStep,
  increaseStep,
  dentistId,
  setDentistId,
}: IProps) => {
  const { addDentist, getDentist } = useDentists();
  const [dentist, setDentist] = useState<IDentist | null>();
  const [cro, setCro] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [region, setRegion] = useState("");
  const [discount, setDiscount] = useState(0);

  const checkForDentist = async () => {
    const dbDentist = await getDentist(dentistId);
    setDentist(dbDentist);
  };

  useEffect(() => {
    if (dentistId) {
      checkForDentist();
    }
  }, []);

  useEffect(() => {
    if (dentist) {
      setDentistId(dentist.id);
      setCro(dentist.cro);
      setName(dentist.name);
      setPhone(dentist.phone);
      setEmail(dentist.email);
      setZip(dentist.address.zip);
      setStreet(dentist.address.street);
      setAddressNumber(dentist.address.addressNumber);
      setDistrict(dentist.address.district);
      setComplement(dentist.address.complement);
      setCity(dentist.address.city);
      setUf(dentist.address.uf);
      setRegion(dentist.region);
      setDiscount(dentist.discount);
    } else {
      setDentistId("");
      setCro("");
      setName("");
      setPhone("");
      setEmail("");
      setZip("");
      setStreet("");
      setAddressNumber("");
      setDistrict("");
      setComplement("");
      setCity("");
      setUf("");
      setRegion("");
      setDiscount(0);
    }
  }, [dentist]);

  const fillAddress = async () => {
    if (zip) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${zip}/json/`);
        const { logradouro, bairro, localidade, uf, complemento } = res.data;

        setStreet(logradouro);
        setDistrict(bairro);
        setCity(localidade);
        setUf(uf);
        setComplement(complemento);
      } catch {
        toast("Não foi possível encontrar CEP.");
      }
    }
  };

  const createDentist = async () => {
    const newDentist = {
      name,
      cro,
      email,
      phone,
      address: {
        zip,
        street,
        addressNumber,
        district,
        city,
        uf,
        complement,
      },
      region,
      discount,
    };

    const id = await addDentist(newDentist);
    return id;
  };

  const checkAndNextStep = async () => {
    if (dentist) {
      setDentistId(dentist.id);
      increaseStep();
    } else {
      const dentistId = await createDentist();
      setDentistId(dentistId);
      increaseStep();
    }
  };

  return (
    <Container>
      <DentistSearchInput
        title={"CRO"}
        value={cro}
        onChangeFunction={setCro}
        onSetFunction={setDentist}
      />
      <LabeledInput title={"Nome"} value={name} onChangeFunction={setName} />
      <LabeledInput
        title={"Telefone"}
        value={phone}
        onChangeFunction={setPhone}
      />
      <LabeledInput
        title={"E-Mail"}
        value={email}
        onChangeFunction={setEmail}
        type="email"
      />
      <LabeledInput
        title={"CEP"}
        value={zip}
        onChangeFunction={setZip}
        onBlur={fillAddress}
      />
      <LabeledInput title={"Rua"} value={street} onChangeFunction={setStreet} />
      <LabeledInput
        title={"Número"}
        value={addressNumber}
        onChangeFunction={setAddressNumber}
      />
      <LabeledInput
        title={"Complemento"}
        value={complement}
        onChangeFunction={setComplement}
      />
      <LabeledInput
        title={"Bairro"}
        value={district}
        onChangeFunction={setDistrict}
      />
      <LabeledInput title={"Cidade"} value={city} onChangeFunction={setCity} />
      <LabeledInput title={"Estado"} value={uf} onChangeFunction={setName} />
      <LabeledInput
        title={"Região"}
        value={region}
        onChangeFunction={setRegion}
      />
      <label>Desconto: {discount}%</label>
      <div className="bottom-navigation">
        <div className="functional-icon" onClick={decreaseStep}>
          <MdOutlineKeyboardArrowLeft color="black" fontSize="1.3em" />
        </div>
        <div className="functional-icon" onClick={checkAndNextStep}>
          <MdOutlineKeyboardArrowRight color="black" fontSize="1.3em" />
        </div>
      </div>
    </Container>
  );
};

export default DentistForm;
