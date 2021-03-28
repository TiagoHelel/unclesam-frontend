import axios from "axios";

const api = axios.create({
  // baseURL: "https://api.tribeservices.com.br",
  baseURL: "http://localhost:3333",
});

export default api;
