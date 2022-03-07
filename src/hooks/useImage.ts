import { deleteObject, getMetadata, ref, uploadString } from "firebase/storage";
import { fbStorage } from "../services/firebase";

const useImage = () => {
  const getProfileImage = async (id: string) => {
    const profileRef = ref(fbStorage, `profile/${id}.jpg`);

    try {
      const metadata = await getMetadata(profileRef);
      console.log(metadata);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadProfileImage = async (id: string, image: string) => {
    const profileRef = ref(fbStorage, "/profile");
    try {
      await uploadString(profileRef, image);
      console.log("deu upload");
    } catch {
      console.log("Deu não");
    }
  };

  const deleteProfileImage = async (id: string) => {
    const profileRef = ref(fbStorage, `profile/${id}.jpg`);
    try {
      await deleteObject(profileRef);
    } catch {
      console.log("deu erro");
    }
  };

  return { deleteProfileImage, getProfileImage, uploadProfileImage };
};

export default useImage;
