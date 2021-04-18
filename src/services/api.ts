import axios from "axios";

const api = axios.create({
  baseURL: "https://api.docload.com.br",
});

export default api;
