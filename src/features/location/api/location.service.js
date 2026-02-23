import apiClient from "@/api/axios-instance";

export const AuthApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post("/v1/dashboard/login", credentials);
    return data; // Expecting { user: {...}, token: "..." }
  },
  logout: async () => {
    const { data } = await apiClient.post("/v1/dashboard/logout");
    return data;
  },
};
