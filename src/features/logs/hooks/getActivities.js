import { useQuery } from "@tanstack/react-query";
import { LogsApi } from "../api/logs.service";

export const useGetActivities = (payload, skip = false) => {
  return useQuery({
    queryKey: ["activities", payload],
    queryFn: () => LogsApi.getActivities(payload, skip),
    select: ({ response_code, data, ...response }) => {
      if (response_code == "0000") {
        const modifiedData =
          data.length > 0
            ? data.map((item) => {
                const updatedDate = new Date(item.updated_at);
                return {
                  ...item,
                  role: item.user.role.replace("_", " "),
                  created_at: updatedDate
                    .toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(" at", ","),
                };
              })
            : [];
        return {
          ...response,
          response_code,
          data: modifiedData,
        };
      } else {
        return { response_code, data, ...response };
      }
    },
    placeholderData: (previousData) => previousData,
    enabled: !!payload, // Only fetch if userId exists
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });
};
