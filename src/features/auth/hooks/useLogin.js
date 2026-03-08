import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApi } from "../api/auth.service";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const { openModal } = useModalStore();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: ({ data }) => {
      setSession(
        data.user,
        data.access_token,
        data.token_type,
        data.refresh_token,
        data.expires_in,
      );

      router.push("/dashboard");
    },
    onError: (error) => {
      const responseData = error?.response?.data;

      const errorMessage =
        responseData?.response_message || error.message || "Network Error";

      openModal("ERROR", { messages: errorMessage });
    },
  });
};
