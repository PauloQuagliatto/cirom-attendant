import { useEffect, useState } from "react";
import moment from "moment";
import { MdOutlineKeyboardArrowRight, MdOutlinePerson } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

import useClients from "../../hooks/useClients";
import useImage from "../../hooks/useImage";

import LabeledInput from "../LabeledInput";
import ClientSearchInput from "../ClientSearchInput";
import DatePicker from "../DatePicker";

import Container from "./styles";

import { IClient } from "../../../types";

interface IProps {
  increaseStep: () => void;
  setClientId: (id: string) => void;
}

const ClientForm = ({ increaseStep, setClientId }: IProps) => {
  const { addClient } = useClients();
  const { uploadProfileImage } = useImage();
  const [client, setClient] = useState<IClient | null>();
  const [profilePic, setProfilePic] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState(moment().valueOf());
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setCpf(client.cpf);
      setEmail(client.email);
      setCellphone(client.cellphone);
      setPhone(client.phone);
      setZip(client.address.zip);
      setStreet(client.address.street);
      setDistrict(client.address.district);
      setAddressNumber(client.address.addressNumber);
      setComplement(client.address.complement);
      setCity(client.address.city);
      setUf(client.address.uf);
    } else {
      setName("");
      setCpf("");
      setEmail("");
      setCellphone("");
      setPhone("");
      setZip("");
      setStreet("");
      setDistrict("");
      setAddressNumber("");
      setComplement("");
      setCity("");
      setUf("");
    }
  }, [client]);

  const imagePreviewHandler = async (e: any) => {
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    setProfilePic(e.target.files[0]);
  };

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

  const createClient = async () => {
    const newClient = {
      name,
      cpf,
      email,
      cellphone,
      phone,
      address: { zip, street, addressNumber, district, city, uf, complement },
    };

    const id = await addClient(newClient);

    if (profilePic) {
      uploadProfileImage(id, profilePic);
    }

    return id;
  };

  const checkAndNextStep = async () => {
    if (client) {
      console.log("não vai criar cliente");
      setClientId(client.id);
      increaseStep();
    } else {
      console.log("vai criar cliente");
      const clientId = await createClient();
      setClientId(clientId);
      increaseStep();
    }
  };

  return (
    <Container>
      <h1>Cliente</h1>
      <div id="photo-input">
        <label id="image-picker-label" htmlFor="image-picker">
          {profilePic ? (
            <img
              src={imagePreviewUrl}
              alt="food-image"
              height="100%"
              width="100%"
              border-radius="8px"
            />
          ) : (
            <div className="no-image">
              <MdOutlinePerson color="#3e49e7" fontSize="80px" />
            </div>
          )}
        </label>
        <input
          id={"image-picker"}
          type="file"
          name="file"
          onChange={imagePreviewHandler}
          accept="image/jpeg"
          style={{
            display: "none",
          }}
        />
      </div>
      <LabeledInput title={"Nome"} value={name} onChangeFunction={setName} />
      <ClientSearchInput
        title={"CPF"}
        value={cpf}
        onChangeFunction={setCpf}
        onSetFunction={setClient}
      />
      <DatePicker birthdate={birthdate} setBirthdate={setBirthdate} />
      <LabeledInput
        title={"E-Mail"}
        value={email}
        onChangeFunction={setEmail}
      />
      <LabeledInput
        title={"Celular"}
        value={cellphone}
        onChangeFunction={setCellphone}
      />
      <LabeledInput
        title={"Telefone"}
        value={phone}
        onChangeFunction={setPhone}
      />
      <LabeledInput
        title={"CEP"}
        value={zip}
        onChangeFunction={setZip}
        onBlur={fillAddress}
      />
      <LabeledInput title={"Rua"} value={street} onChangeFunction={setStreet} />
      <LabeledInput
        title={"Bairro"}
        value={district}
        onChangeFunction={setDistrict}
      />
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
      <LabeledInput title={"Cidade"} value={city} onChangeFunction={setCity} />
      <LabeledInput title={"Estado"} value={uf} onChangeFunction={setUf} />
      <div className="bottom-navigation">
        <div></div>
        <div className="functional-icon" onClick={checkAndNextStep}>
          <MdOutlineKeyboardArrowRight color="black" fontSize="1.3em" />
        </div>
      </div>
    </Container>
  );
};

export default ClientForm;
