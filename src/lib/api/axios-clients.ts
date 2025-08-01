import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.100:5000/api/";

export const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
});
