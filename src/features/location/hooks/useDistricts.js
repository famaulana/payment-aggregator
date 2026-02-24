import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";

export const useDistricts = () => {
  const queryClient = useQueryClient();

  const loadOptions = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    return queryClient.fetchQuery({
      // The queryKey includes the inputValue so specific searches are cached
      queryKey: ["get-districts", inputValue],
      queryFn: LocationApi.getDistricts(inputValue),
      staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
    });
  };

  return { loadOptions };
};
