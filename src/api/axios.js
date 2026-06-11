import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1190",
});

export default API;