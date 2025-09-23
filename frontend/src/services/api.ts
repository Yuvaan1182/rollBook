// src/services/api.ts
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface ApiError {
  status?: number;
  message: string;
}

// 🔹 Normalize API errors
export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      const status = axiosError.response.status;

      let message: string;
      switch (status) {
        case 400:
          message = axiosError.response.data?.message || "Bad request.";
          break;
        case 401:
          message = "Unauthorized. Please log in.";
          // Optional: redirect
          window.location.href = "/login";
          break;
        case 403:
          message = "Forbidden. You don’t have access.";
          break;
        case 404:
          message = "Resource not found.";
          break;
        case 500:
          message = "Internal server error.";
          break;
        default:
          message = axiosError.response.data?.message || `Error ${status}`;
      }

      return { status, message };
    } else if (axiosError.request) {
      return { message: "No response from server." };
    } else {
      return { message: axiosError.message };
    }
  }
  return { message: "Unexpected error occurred." };
}

// 🔹 Axios instance
export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Interceptor: log + toast
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = handleApiError(err);
    toast.error(error.message);
    return Promise.reject(error); // return normalized error
  }
);
