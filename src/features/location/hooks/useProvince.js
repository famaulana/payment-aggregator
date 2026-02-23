import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApi } from "../api/location.service";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: ({ response_code, data }) => {
      if (response_code == "0000")
        setSession(
          data.user,
          data.access_token,
          data.token_type,
          data.refresh_token,
        );
      router
        .push("/dashboard")
        .then(() => {
          console.log("Navigation complete");
        })
        .catch((err) => console.error("Navigation failed", err));
    },
  });
};
