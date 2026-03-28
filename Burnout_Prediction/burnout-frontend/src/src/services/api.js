import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const predictBurnout = (data) => API.post("/predict", data);

export const loginUser = (data) => API.post("/login", data);

export const getHistory = () => API.get("/history");

export default API;