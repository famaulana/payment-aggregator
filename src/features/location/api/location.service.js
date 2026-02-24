import apiClient from "@/api/axios-instance";

export const LocationApi = {
  getProvinces: async (payload) => {
    const queryParams =
      typeof payload === "string" ? { search: payload } : payload;

    const { data } = await apiClient.get("/v1/dashboard/locations/provinces", {
      params: queryParams,
      _skipLoading: true,
    });

    const { data: listProvince } = data;

    return listProvince.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));
  },
  getCities: async (payload) => {
    const { data } = await apiClient.get("/v1/dashboard/locations/cities", {
      params: payload,
      _skipLoading: true,
    });
    return data.map((item) => ({ ...item, label: item.name, value: item.id }));
  },
  getDistricts: async (payload) => {
    const { data } = await apiClient.get("/v1/dashboard/locations/districts", {
      params: payload,
      _skipLoading: true,
    });
    return data.map((item) => ({ ...item, label: item.name, value: item.id }));
  },
  getSubDistricts: async (payload) => {
    const { data } = await apiClient.get(
      "/v1/dashboard/locations/sub-districts",
      {
        params: payload,
        _skipLoading: true,
      },
    );
    return data.map((item) => ({ ...item, label: item.name, value: item.id }));
  },
};
