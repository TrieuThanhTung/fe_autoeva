
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_BASE_URL = 'https://spec.autoeva.io.vn/';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access-token");
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    if (accessToken && uid && client) {
      config.headers["access-token"] = accessToken;
      config.headers["uid"] = uid;
      config.headers["client"] = client;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return error.response || Promise.reject(error);
  }
);

export default axiosInstance;
