import axios from "axios";
import useAuthStore from "@/stores/authStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().tokens?.access;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const refreshToken = useAuthStore.getState().tokens?.refresh;

      if (refreshToken) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            `${axiosInstance.defaults.baseURL}/auth/token-refresh/`,
            { refresh: refreshToken },
            {
              headers: { "Content-Type": "application/json" },
              _retry: true,
            } as any
          );

          if (response.status === 200) {
            const { refresh, access } = response.data;

            useAuthStore.getState().setTokens({ refresh, access });

            originalRequest.headers.Authorization = `Bearer ${access}`;
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          useAuthStore.getState().removeUser();
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        }
      } else {
        useAuthStore.getState().removeUser();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
