import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { AuthApi } from "../api/auth.service";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const logoutAction = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      logoutAction();
      queryClient.clear();
    },
    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};
