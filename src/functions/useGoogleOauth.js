import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${BACKEND_URL}`,
});

const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`);


const useGoogleOauth = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const { email, name } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/");
      } else {
        console.error(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.error("Error while Google Login...", e);
    }
  };

  const googleLoginSignUp = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return { googleLoginSignUp };
};

export default useGoogleOauth;
