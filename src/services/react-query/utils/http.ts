import { readLocalStorageValue } from "@mantine/hooks";
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = readLocalStorageValue({ key: 'yourTokenAuth' });
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;