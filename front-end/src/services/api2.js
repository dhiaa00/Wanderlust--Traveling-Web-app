import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${backendUrl}`,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
