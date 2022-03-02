import { deleteObject, getMetadata, ref, uploadBytes } from "firebase/storage";
import { fbStorage } from "../services/firebase";

const useImage = () => {
  
  const getProfileImage = async (id: string) => {
    const profileRef = ref(fbStorage, `profile/${id}.jpg`);

    try {
      const metadata = await getMetadata(profileRef);
      console.log(metadata);
    } catch (err){
      console.log(err);
    }
  };

  const uploadProfileImage = async (id: string, image: File) => {
    const profileRef = ref(fbStorage, `profile/${id}.jpg`);
    try {
      await uploadBytes(profileRef, image);
      console.log("deu upload");
    } catch {
      console.log("deu erro");
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
