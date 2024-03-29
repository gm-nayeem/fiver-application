import axios from "axios";
const BASE_URL = "http://localhost:4700/api";
// const BASE_URL = "https://fiver-application.vercel.app/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: JSON.parse(localStorage.getItem("fiverUser"))?.accessToken && {
    token: `Bearer ${JSON.parse(localStorage.getItem("fiverUser"))?.accessToken}`
  }
});
