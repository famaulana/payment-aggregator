import apiClient from "@/api/axios-instance";

export const UsersApi = {
  getUserList: async (payload) => {
    const { data } = await apiClient.get("/v1/dashboard/users", {
      params: payload,
    });
    return data;
  },
  createUser: async (payload) => {
    const { data } = await apiClient.post("/v1/dashboard/users", payload);
    return data;
  },
  getUserDetails: async (payload) => {
    if (!payload) return;

    const { data } = await apiClient.get(`/v1/dashboard/users/${payload}`);
    return data;
  },
};
