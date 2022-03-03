import { useState } from "react";
import {
  MdAddPhotoAlternate,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

import useClients from "../../hooks/useClients";
import useImage from "../../hooks/useImage";

import LabeledInput from "../LabeledInput";

interface IProps {
  increaseStep: () => void;
}

const UserForm = ({ increaseStep }: IProps) => {
  const { addClient } = useClients();
  const { uploadProfileImage } = useImage();
  const [profilePic, setProfilePic] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
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

  const imagePreviewHandler = async (e: any) => {
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    setProfilePic(e.target.files[0]);
  };

  const fillAddress = async () => {
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
  };

  return (
    <div>
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
            <MdAddPhotoAlternate color="#242c9b" fontSize="80px" />
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
      <LabeledInput title={"CPF"} value={cpf} onChangeFunction={setCpf} />
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
      <div className="functional-icon" onClick={increaseStep}>
        <MdOutlineKeyboardArrowRight />
      </div>
    </div>
  );
};

export default UserForm;
