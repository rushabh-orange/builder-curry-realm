import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/.netlify/functions/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000, // 20s timeout
});

// Attach token to requests
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const payload: any = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(payload);
  }
);

export default api;
