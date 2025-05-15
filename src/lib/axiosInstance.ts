import axios from "axios";
import useAuthStore from "@/stores/authStore";

// Create a base axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add request interceptor to include the access token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the latest access token directly from the Zustand store
    const accessToken = useAuthStore.getState().tokens?.access;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// TEMPORARY: Removed token refresh function to simplify authentication

// Simple response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Basic error logging
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
