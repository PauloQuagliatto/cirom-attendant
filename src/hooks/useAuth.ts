import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";

import { fbAuth, db } from "../services/firebase";

import { IUser } from "../../types";

const useAuth = () => {
  const { auth, setAuth, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(fbAuth, email, password);
      setAuth(true);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (userName: string, password: string) => {
    const q = query(
      collection(db, "employees"),
      where("userName", "==", userName)
    );

    const querySnapshot = await getDocs(q);
    let fbUser: any = {};
    querySnapshot.forEach((doc) => {
      if (doc.data().password === password) {
        fbUser = doc.data();
      }
    });

    setUser(fbUser as IUser);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return { auth, user, handleAuth, handleLogin, handleLogout };
};

export default useAuth;
