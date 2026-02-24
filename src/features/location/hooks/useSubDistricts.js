import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";

export const useSubDistricts = () => {
  const queryClient = useQueryClient();

  const loadOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    return queryClient.fetchQuery({
      // The queryKey includes the inputValue so specific searches are cached
      queryKey: ["get-subdistricts", inputValue],
      queryFn: LocationApi.getSubDistricts(inputValue),
      staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
    });
  };

  return { loadOptions };
};
