import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

// when no need to verifytoken
export const publicRequest = axios.create({
  baseURL: BASE_URL
});

// when verifytoken
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: JSON.parse(localStorage.getItem("currentUser"))?.accessToken && {
    token: `Bearer ${JSON.parse(localStorage.getItem("currentUser"))?.accessToken}`
  }
});
