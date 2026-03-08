import { create } from "zustand";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export const useAuthStore = create((set) => ({
  // Initialize from cookie if available (helps with hydration)
  user: null,
  token: typeof window !== "undefined" ? getCookie("access_token") : null,

  setSession: (user, token, tokenType, refresh, timeout) => {
    set({ user, token });
    setCookie("user", user);
    // Save to cookie for server-side access (expires in 7 days)
    setCookie("access_token", token, {
      path: "/", // 👈 CRITICAL: Must be root path
      maxAge: timeout,
    });
    setCookie("refresh_token", refresh);
    setCookie("token_type", tokenType);
  },

  logout: () => {
    set({ user: null, token: null });
    deleteCookie("access_token", { path: "/" });
    deleteCookie("refresh_token");
    deleteCookie("token_type");
    setTimeout(() => {
      window.location.href = "/login"; // Force a clean redirect
    });
  },
}));
