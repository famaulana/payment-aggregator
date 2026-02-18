"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

const ROLE_PERMISSIONS = {
  system_owner: ["/account-management", "/dashboard", "/settings"],
  client: ["/dashboard", "/monitoring"],
  headquarter: ["/dashboard", "/monitoring"],
  merchant: ["/dashboard", "/monitoring"],
};

export default function RoleProtector({ children }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Compute authorization strictly during render (stable)
  const isAllowed = useMemo(() => {
    if (!user) return false;

    const allowedPaths = ROLE_PERMISSIONS[user.role] || [];
    // Always allow dashboard, otherwise check permissions
    return (
      pathname === "/dashboard" ||
      allowedPaths.some((path) => pathname.startsWith(path))
    );
  }, [user, pathname]);

  // 2. Handle Redirects in useEffect (Side Effect)
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (!isAllowed) {
      router.replace("/dashboard");
    }
  }, [user, isAllowed, router]);

  // 3. THE FIX: If not ready, return null.
  // This prevents the "Children" from mounting and triggering their own effects
  if (user && !isAllowed) {
    return null;
  }

  return <>{children}</>;
}
