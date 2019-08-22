import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/";
export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`
  }
});
