import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthApi } from "../api/auth.service";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const router = useRouter();

  // return useMutation({
  //   mutationFn: AuthApi.login,
  //   onSuccess: (data) => {
  //     setSession(data.username, data.token);
  //     router
  //       .push("/dashboard")
  //       .then(() => {
  //         console.log("Navigation complete");
  //       })
  //       .catch((err) => console.error("Navigation failed", err));
  //   },
  // });
  return useMutation({
    mutationFn: async (params) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            params.email === "admin@gmail.com" &&
            params.password === "password123"
          ) {
            resolve({ username: "admin", token: "fake-jwt-token" });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
    },
    onSuccess: (data) => {
      setSession(data.username, data.token);
      router.push("/dashboard");
    },
  });
};
