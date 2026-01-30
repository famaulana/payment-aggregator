import { create } from "zustand";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

export const useAuthStore = create((set) => ({
  // Initialize from cookie if available (helps with hydration)
  user: null,
  token: typeof window !== "undefined" ? getCookie("auth_token") : null,

  setSession: (user, token) => {
    set({ user, token });
    // Save to cookie for server-side access (expires in 7 days)
    setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 });
  },

  logout: () => {
    set({ user: null, token: null });
    deleteCookie("auth_token");
    window.location.href = "/login"; // Force a clean redirect
  },
}));
