import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Centralized backend API URL (set this in your .env file as NEXT_PUBLIC_API_BASE_URL)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.1.100:3000/";

/**
 * Custom error class for API errors with enhanced details
 */
export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Formats error message from API response
 * Hides status codes in the error message text
 */
export const formatApiErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: { message?: string } } }).response === "object" &&
    (error as { response?: { data?: { message?: string } } }).response !== null &&
    (error as { response?: { data?: { message?: string } } }).response !== undefined &&
    typeof (error as { response?: { data?: { message?: string } } }).response?.data === "object" &&
    (error as { response?: { data?: { message?: string } } }).response?.data !== null &&
    (error as { response?: { data?: { message?: string } } }).response?.data !== undefined &&
    "message" in ((error as { response?: { data?: { message?: string } } }).response?.data ?? {})
  ) {
    return (error as { response: { data: { message: string } } }).response.data.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: string }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "An unexpected error occurred";
};

// Axios instance for authenticated requests
export const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Axios instance for public (no-login) requests
export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for authenticated requests
axiosAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for authenticated requests
axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized globally
      if (status === 401) {
        // Clear tokens if unauthorized
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          // Don't redirect from login-related pages
          const isAuthPage =
            window.location.pathname.includes("/login") ||
            window.location.pathname.includes("/forgot-password") ||
            window.location.pathname.includes("/reset-password");

          if (!isAuthPage) {
            window.location.href = "/login";
          }
        }
      }

      // Extract error message from response
      const errorMessage =
        (typeof data === "object" && data !== null && "message" in data && typeof (data as { message?: string }).message === "string"
          ? (data as { message: string }).message
          : typeof data === "object" && data !== null && "error" in data && typeof (data as { error?: string }).error === "string"
          ? (data as { error: string }).error
          : "An error occurred");

      // Create an ApiError with the error details
      return Promise.reject(new ApiError(errorMessage, status, data));
    }

    // Network errors (no response)
    if (error.request) {
      return Promise.reject(
        new ApiError("Network error. Please check your connection."),
      );
    }

    // Other errors
    return Promise.reject(
      new ApiError(error.message || "An unexpected error occurred"),
    );
  },
);

// Apply the same response interceptor to public requests
axiosPublic.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      // Extract error message from response
      const errorMessage =
        (typeof data === "object" && data !== null && "message" in data && typeof (data as { message?: string }).message === "string"
          ? (data as { message: string }).message
          : typeof data === "object" && data !== null && "error" in data && typeof (data as { error?: string }).error === "string"
          ? (data as { error: string }).error
          : "An error occurred");

      // Create an ApiError with the error details
      return Promise.reject(new ApiError(errorMessage, status, data));
    }

    // Network errors (no response)
    if (error.request) {
      return Promise.reject(
        new ApiError("Network error. Please check your connection."),
      );
    }

    // Other errors
    return Promise.reject(
      new ApiError(error.message || "An unexpected error occurred"),
    );
  },
);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
