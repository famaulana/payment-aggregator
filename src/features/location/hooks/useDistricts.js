import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";
import { useCallback } from "react";

export const useDistricts = (must) => {
  const queryClient = useQueryClient();

  const loadOptions = useCallback(async (inputValue, city) => {
    if (!inputValue || inputValue.length < 2) return [];

    if (must) {
      return queryClient.fetchQuery({
        // The queryKey includes the inputValue so specific searches are cached
        queryKey: ["get-districts", inputValue],
        queryFn: () =>
          LocationApi.getDistricts({ city_id: city, search: inputValue }),
        staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
      });
    } else {
      return queryClient.fetchQuery({
        // The queryKey includes the inputValue so specific searches are cached
        queryKey: ["get-districts", inputValue],
        queryFn: () => LocationApi.getDistricts(inputValue),
        staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
      });
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadOptions };
};
