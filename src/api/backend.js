import axios from "axios";

const backend = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://44.203.240.206:5000/"
      // : "http://44.203.240.206:5000/",
  : "http://localhost:5000",
});

backend.interceptors.request.use(
  (config) => {
    let token = "";
    token = sessionStorage.getItem("Token");
    if (!token) token = localStorage.getItem("Token");
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => Promise.reject(error)
);

export default backend;
