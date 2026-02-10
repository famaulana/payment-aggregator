import { useMutation } from "@tanstack/react-query";
import { UsersApi } from "../api/users.service";
import { useModalStore } from "@/store/useModalStore";

export const useCreateUser = () => {
  const { openModal } = useModalStore();

  return useMutation({
    mutationFn: UsersApi.createUser,
    onSuccess: ({ response_code, response_messages }) => {
      if (response_code == "0000") {
        openModal("SUCCESS", { messages: response_messages });
      }
    },
  });
};
