import apiClient from "@/api/axios-instance";

export const UsersApi = {
  getUserList: async (payload) => {
    const { data } = await apiClient.get("/v1/dashboard/users", {
      params: payload,
    });
    return data;
  },
  getUserDetails: async (payload) => {
    if (!payload) return;

    const { data } = await apiClient.get(`/v1/dashboard/users/${payload}`);
    return data;
  },
  createUser: async (payload) => {
    const response = await apiClient.post(
      "/v1/dashboard/users/with-entity",
      payload,
    );
    return response.data;
  },
  updateUser: async (id, payload) => {
    const response = await apiClient.put(`/v1/dashboard/users/${id}`, {payload});
    return response.data;
  },
};
