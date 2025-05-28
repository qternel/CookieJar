import axios from "axios";

const api = axios.create();

const token = localStorage.getItem("token");
if (token) api.defaults.headers["Autorization"] = token;

export default api;
