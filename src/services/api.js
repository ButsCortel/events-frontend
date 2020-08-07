import axios from "axios";

const api = axios.create({
  baseURL: "https://event-managing.herokuapp.com/",
});

export default api;
