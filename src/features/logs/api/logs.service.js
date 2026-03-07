import apiClient from "@/api/axios-instance";

export const LogsApi = {
  getActivities: async (payload, skip = false) => {
    const queryParams =
      typeof payload === "string" ? { search: payload } : payload;

    const { data } = await apiClient.get("/v1/dashboard/audit-logs", {
      params: { ...queryParams, per_page: 15 },
      _skipLoading: skip,
    });

    return data;
  },
};
