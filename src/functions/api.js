//file created by : Edasgh
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: `${BACKEND_URL}`,
});

export const googleAuth=(code)=>api.get(`/api/auth/google?code=${code}`);

