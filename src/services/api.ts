import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tribeservices.com.br",
});

export default api;
