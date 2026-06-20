import axios from "axios";

const api = axios.create({
  baseURL: "https://online-memory.onrender.com"
});

export default api;
