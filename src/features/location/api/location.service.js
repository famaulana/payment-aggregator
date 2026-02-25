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
    const queryParams =
      typeof payload === "string" ? { search: payload } : payload;

    const { data } = await apiClient.get("/v1/dashboard/locations/cities", {
      params: queryParams,
      _skipLoading: true,
    });

    const { data: listCity } = data;

    return listCity.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));
  },
  getDistricts: async (payload) => {
    const queryParams =
      typeof payload === "string" ? { search: payload } : payload;

    const { data } = await apiClient.get("/v1/dashboard/locations/districts", {
      params: queryParams,
      _skipLoading: true,
    });

    const { data: listDistrict } = data;

    return listDistrict.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));
  },
  getSubDistricts: async (payload) => {
    const queryParams =
      typeof payload === "string" ? { search: payload } : payload;

    const { data } = await apiClient.get(
      "/v1/dashboard/locations/sub-districts",
      {
        params: queryParams,
        _skipLoading: true,
      },
    );

    const { data: listSubDistrict } = data;

    return listSubDistrict.map((item) => ({
      ...item,
      label: item.name,
      value: item.id,
    }));
  },
};
