import { useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";

import useClients from "../../hooks/useClients";
import useImage from "../../hooks/useImage";

interface IProps {
  increaseStep: (step: number) => void;
}

const UserForm = ({ increaseStep }: IProps) => {
  const { addClient } = useClients();
  const { uploadProfileImage } = useImage();
  const [profilePic, setProfilePic] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [complement, setComplement] = useState("");

  const imagePreviewHandler = async (e: any) => {
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    setProfilePic(e.target.files[0]);
  };

  const createClient = async () => {
    const newClient = {
      name,
      cpf,
      email,
      cellphone,
      phone,
      address: { cep, street, addressNumber, city, uf, complement },
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
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default UserForm;
