import { useQuery } from "@tanstack/react-query";
import { UsersApi } from "../api/users.service";

export const useGetUser = (payload) => {
  return useQuery({
    queryKey: ["user", payload],
    queryFn: () => UsersApi.getUserList(payload),
    select: ({ response_code, data, ...response }) => {
      if (response_code == "0000") {
        const modifiedData =
          data.length > 0
            ? data.map((item) => {
                const updatedDate = new Date(item.updated_at);
                return {
                  ...item,
                  role: item.role.replace("_", " "),
                  updated_at: updatedDate
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
          response,
          response_code,
          data: modifiedData,
        };
      } else {
        return { response_code, data, response };
      }
    },
    enabled: !!payload, // Only fetch if userId exists
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });
};
