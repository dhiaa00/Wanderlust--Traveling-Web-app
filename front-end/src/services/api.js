import axios from "axios";

const backendUrl = "https://wanderlust-backend-server.onrender.com";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

export const googleAuth = async (code) => {
  console.log("Code:", code);
  return api.get(`/auth/google`);
};
