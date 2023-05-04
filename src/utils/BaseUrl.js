import axios from "axios";

const api = axios.create({
  baseURL: 'https://litetube-server.vercel.app/api'
})

export default api;
