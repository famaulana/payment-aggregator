import apiClient from "@/api/axios-instance";

export const AuthApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data; // Expecting { user: {...}, token: "..." }
  },
  logout: async (id) => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },
};
