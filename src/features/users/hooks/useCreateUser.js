import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersApi } from "../api/users.service";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/router";

export const useCreateUser = () => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UsersApi.createUser,
    onSuccess: ({ response_code, data, response_message }) => {
      if (response_code == "0001") {
        queryClient.invalidateQueries({ queryKey: ["userList"] });
        openModal("SUCCESS", { messages: response_message });
        router.push(
          {
            pathname: `/detail`,
            query: { id: data.id },
          },
          undefined,
          { shallow: true },
        );
      }
    },
    onError: (error) => {
      const responseData = error?.response?.data;

      const errorMessage =
        responseData?.response_message || error.message || "Network Error";

      openModal("ERROR", { messages: errorMessage });
    },
  });
};
