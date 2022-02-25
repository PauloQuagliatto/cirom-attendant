import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { AuthContext } from "../context/AuthContext";

import { auth } from "../services/firebase";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleLogin };
};

export default useAuth;
