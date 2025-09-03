import axios, { type AxiosInstance } from "axios";

const apiCLient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiCLient;
