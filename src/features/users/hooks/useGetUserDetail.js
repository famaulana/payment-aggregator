import { useQuery } from "@tanstack/react-query";
import { UsersApi } from "../api/users.service";

export const useGetUserDetail = (payload) => {
  return useQuery({
    queryKey: ["userDetail", payload],
    queryFn: () => UsersApi.getUserDetails(payload),
    select: ({ response_code, data, ...response }) => {
      if (response_code == "0000") {
        const updatedDate = new Date(data.updated_at);
        const modifiedData = {
          ...data,
          role: data.role.replace("_", " "),
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
