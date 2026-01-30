import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { AuthApi } from "../api/auth.service";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      // SUCCESS: Save to Global Variable (Zustand)
      setSession(data.user, data.token);
    },
  });
};
