import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApi } from "../api/auth.service";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const logoutAction = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      logoutAction();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
