//file created by : Edasgh
import axios from "axios";

const api = axios.create({
  baseURL: `${VITE_BACKEND_URL}`,
});

export const googleAuth=(code)=>api.get(`/google?code=${code}`);

