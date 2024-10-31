//file created by : Edasgh
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

export const googleAuth=(code)=>api.get(`/google?code=${code}`);

