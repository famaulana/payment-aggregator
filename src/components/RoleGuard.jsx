"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ROLE_PERMISSIONS = {
  system_owner: ["/account-management", "/dashboard", "/settings"],
  client: ["/dashboard", "/monitoring"],
  headquarter: ["/dashboard", "/monitoring"],
  merchant: ["/dashboard", "/monitoring"],
};

export default function RoleProtector({ children }) {
  const { user, isHydrated } = useAuthStore(); // Ensure store is loaded from localStorage
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Wait for Zustand to hydrate if you're using persist middleware
    if (!isHydrated) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const allowedPaths = ROLE_PERMISSIONS[user.role] || [];
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    if (!isAllowed) {
      router.replace("/dashboard");
    } else {
      setAuthorized(true);
    }
  }, [user, pathname, isHydrated, router]);

  return children;
}
