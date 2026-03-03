import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";
import { useCallback } from "react";

export const useProvinces = () => {
  const queryClient = useQueryClient();

  const loadOptions = useCallback(async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];

    return queryClient.fetchQuery({
      // The queryKey includes the inputValue so specific searches are cached
      queryKey: ["get-provinces", inputValue],
      queryFn: () => LocationApi.getProvinces(inputValue),
      staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadOptions };
};
