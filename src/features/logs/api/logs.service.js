import apiClient from "@/api/axios-instance";

export const LogsApi = {
  getActivities: async (payload) => {
    const { data } = await apiClient.get("/v1/dashboard/audit-logs", {
      params: { ...payload, per_page: 15 },
    });
    return data;
  },
};
