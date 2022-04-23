import { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { MdOutlineKeyboardArrowRight, MdOutlinePerson } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

import useClients from "../../hooks/useClients";
import useImage from "../../hooks/useImage";

import LabeledInput from "../LabeledInput";
import ClientSearchInput from "../ClientSearchInput";
import BirthDatePicker from "../BirthDatePicker";
import CameraModal from "../CameraModal";

import Container from "./styles";

import { IClient } from "../../../types";

interface IProps {
  increaseStep: () => void;
  clientId: string;
  setClientId: (id: string) => void;
}

const ClientForm = ({ increaseStep, clientId, setClientId }: IProps) => {
  const { addClient, getClient } = useClients();
  const { uploadProfileImage } = useImage();

  const [client, setClient] = useState<IClient | null>();
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState<Moment>(moment());
  const [momName, setMomName] = useState("");
  const [dadName, setDadName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const years = moment().diff(birthDate, "years");

  const checkForClient = async () => {
    const dbClient = await getClient(clientId);
    setClient(dbClient);
  };

  useEffect(() => {
    if (clientId) {
      checkForClient();
    }
  }, []);

  useEffect(() => {
    if (client) {
      setName(client.name);
      setCpf(client.cpf);
      setBirthDate(moment(client.birthDate));
      setMomName(client.momName);
      setDadName(client.dadName);
      setEmail(client.email);
      setPhone(client.phone);
      setLandline(client.landline);
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
      setBirthDate(moment());
      setEmail("");
      setPhone("");
      setLandline("");
      setZip("");
      setStreet("");
      setDistrict("");
      setAddressNumber("");
      setComplement("");
      setCity("");
      setUf("");
    }
  }, [client]);

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

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);

    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);

    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const createClient = async () => {
    const newClient = {
      name,
      cpf,
      birthDate: birthDate.valueOf(),
      momName,
      dadName,
      email,
      phone,
      landline,
      address: {
        zip,
        street,
        addressNumber,
        district,
        city,
        uf,
        complement,
      },
    };

    const id = await addClient(newClient);

    if (imagePreviewUrl) {
      uploadProfileImage(id, imagePreviewUrl);
    }

    return id;
  };

  const checkAndNextStep = async () => {
    if (client) {
      setClientId(client.id);
      if (imagePreviewUrl) {
        uploadProfileImage(client.id, imagePreviewUrl);
      }
      increaseStep();
    } else {
      const clientId = await createClient();
      setClientId(clientId);
      increaseStep();
    }
  };

  return (
    <>
      <Container>
        <h1>Cliente</h1>
        <div id="image-picker-label">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} onClick={() => setIsOpen(true)} />
          ) : (
            <div className="no-image">
              <MdOutlinePerson
                color="#3e49e7"
                fontSize="80px"
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
        </div>
        <LabeledInput title={"Nome"} value={name} onChangeFunction={setName} />
        <ClientSearchInput
          title={"CPF"}
          value={cpf}
          onChangeFunction={setCpf}
          onSetFunction={setClient}
        />
        <BirthDatePicker birthDate={birthDate} setBirthDate={setBirthDate} />
        {years < 18 && (
          <>
            <LabeledInput
              title={"Nome da Mãe"}
              value={momName}
              onChangeFunction={setMomName}
            />
            <LabeledInput
              title={"Nome do Pai"}
              value={dadName}
              onChangeFunction={setDadName}
            />
          </>
        )}
        <LabeledInput
          title={"E-Mail"}
          value={email}
          onChangeFunction={setEmail}
          type="email"
        />
        <LabeledInput
          title={"Celular"}
          value={phone}
          onChangeFunction={setPhone}
        />
        <LabeledInput
          title={"Telefone"}
          value={landline}
          onChangeFunction={setLandline}
        />
        <LabeledInput
          title={"CEP"}
          value={zip}
          onChangeFunction={setZip}
          onBlur={fillAddress}
        />
        <LabeledInput
          title={"Rua"}
          value={street}
          onChangeFunction={setStreet}
        />
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
        <LabeledInput
          title={"Cidade"}
          value={city}
          onChangeFunction={setCity}
        />
        <LabeledInput title={"Estado"} value={uf} onChangeFunction={setUf} />
        <div className="bottom-navigation">
          <div></div>
          <div className="functional-icon" onClick={checkAndNextStep}>
            <MdOutlineKeyboardArrowRight color="black" fontSize="1.3em" />
          </div>
        </div>
      </Container>
      <CameraModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setImagePreviewUrl={setImagePreviewUrl}
      />
    </>
  );
};

export default ClientForm;
