import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const signup = async (data: any) =>
  await API.post("/api/auth/signup", data);

export const loginUser = async (data: any) =>
  await API.post("/api/auth/login", data);
