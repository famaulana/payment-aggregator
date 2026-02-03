import apiClient from "@/api/axios-instance";

export const AuthApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post(
      "/auth/v1/dashboard/login",
      credentials,
    );
    return data; // Expecting { user: {...}, token: "..." }
  },
  logout: async (id) => {
    const { data } = await apiClient.post("/auth/v1/dashboard/login");
    return data;
  },
};
