import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";
import { useCallback } from "react";

export const useCities = () => {
  const queryClient = useQueryClient();

  const loadOptions = useCallback(async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    return queryClient.fetchQuery({
      // The queryKey includes the inputValue so specific searches are cached
      queryKey: ["get-cities", inputValue],
      queryFn: () => LocationApi.getCities(inputValue),
      staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
    });
  }, []);

  return { loadOptions };
};
