import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { AuthApi } from "../api/auth.service";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const router = useRouter();

  return useMutation({
    mutationFn: async (params) => {
      // Mocking the API delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (params.username === "admin" && params.password === "admin") {
            resolve({ username: "admin", token: "fake-jwt-token" });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
    },
    onSuccess: (data) => {
      setSession(data.username, data.token);
      router
        .push("/dashboard")
        .then(() => {
          console.log("Navigation complete");
        })
        .catch((err) => console.error("Navigation failed", err));
    },
  });
};
