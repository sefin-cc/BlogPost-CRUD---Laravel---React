import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Set your backend URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
