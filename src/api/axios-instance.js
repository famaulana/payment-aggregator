import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getCookie("access_token");
  const tokenType = getCookie("token_type") || "Bearer"; // Default to Bearer

  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  if (!config.url.includes("/dashboard/refresh") && !config._skipLoading) {
    useModalStore.getState().openModal("LOADING", null, "xs");
  }

  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    useModalStore.getState().closeModal();
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // --- EXCLUSION LOGIC START ---
    // 1. If there's no response (network error)
    // 2. If it's NOT a 401
    // 3. If we are already retrying this specific request
    // 4. If the URL is the login or refresh endpoint
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url.includes("/login") || // Adjust path to match your API
      originalRequest.url.includes("/dashboard/refresh")
    ) {
      return Promise.reject(error);
    }
    // --- EXCLUSION LOGIC END ---

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getCookie("refresh_token");
    const logout = useAuthStore.getState().logout;

    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/refresh`, {
          refresh_token: refreshToken,
        })
        .then(({ data }) => {
          const newToken = data.access_token;
          const refreshToken = data.refresh_token;
          const tokenType = data.token_type;

          setCookie("access_token", newToken);
          setCookie("refresh_token", refreshToken);
          setCookie("token_type", tokenType);

          apiClient.defaults.headers.common["Authorization"] =
            `${tokenType} ${newToken}`;
          originalRequest.headers.Authorization = `${tokenType} ${newToken}`;

          processQueue(null, newToken);
          resolve(apiClient(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          logout();
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  },
);

export default apiClient;
