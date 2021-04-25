import axios from "axios";

const api = axios.create({
  baseURL: "https://api.docload.com.br",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default api;
