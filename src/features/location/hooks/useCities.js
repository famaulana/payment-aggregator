import { useQueryClient } from "@tanstack/react-query";
import { LocationApi } from "../api/location.service";
import { useCallback } from "react";

export const useCities = (must) => {
  const queryClient = useQueryClient();

  const loadOptions = useCallback(async (inputValue, province) => {
    if (!inputValue || inputValue.length < 2) return [];

    if (must) {
      return queryClient.fetchQuery({
        // The queryKey includes the inputValue so specific searches are cached
        queryKey: ["get-cities", inputValue],
        queryFn: () =>
          LocationApi.getCities({ province_id: province, search: inputValue }),
        staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
      });
    } else {
      return queryClient.fetchQuery({
        // The queryKey includes the inputValue so specific searches are cached
        queryKey: ["get-cities", inputValue],
        queryFn: () => LocationApi.getCities(inputValue),
        staleTime: 1000 * 60 * 5, // Keep results "fresh" for 5 minutes
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loadOptions };
};
