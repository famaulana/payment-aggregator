import axios from "axios";
import { getCookie } from "cookies-next";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor (Adding the token)
apiClient.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Handling Expired Sessions)
apiClient.interceptors.response.use(
  (response) => response, // If request is successful, just return it
  (error) => {
    // Check if the error is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or invalid. Logging out...");

      // Access the logout function from your Zustand store
      const logout = useAuthStore.getState().logout;
      logout();

      // Optional: Redirect is handled inside logout() via window.location
    }
    return Promise.reject(error);
  },
);

export default apiClient;
