import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { axiosAuth, axiosPublic } from "./axios-clients";
import { ApiError } from "../errors/api-errors";

// ✅ Auth request interceptor
axiosAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Auth response interceptor
axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => handleError(error, true),
);

// ✅ Public response interceptor
axiosPublic.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => handleError(error),
);

function handleError(error: AxiosError, isAuth = false) {
  if (error.response) {
    const { status, data } = error.response;

    if (isAuth && status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      const isAuthPage =
        window.location.pathname.includes("/login") ||
        window.location.pathname.includes("/forgot-password") ||
        window.location.pathname.includes("/reset-password");

      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }

    const errorMessage =
      typeof data === "object" && data !== null && "message" in data
        ? (data as { message: string }).message
        : typeof data === "object" && data !== null && "error" in data
        ? (data as { error: string }).error
        : "An error occurred";

    return Promise.reject(new ApiError(errorMessage, status, data));
  }

  if (error.request) {
    return Promise.reject(
      new ApiError("Network error. Please check your connection."),
    );
  }

  return Promise.reject(
    new ApiError(error.message || "An unexpected error occurred"),
  );
}
