"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const GradientPagination = ({ totalPages = 5 }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Get current page from URL (?page=X), default to 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. Helper to build the URL string while preserving other filters (like search or role)
  const getPageHref = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Box className="flex items-center gap-2 p-4 select-none">
      {/* PREVIOUS BUTTON */}
      <Link
        href={getPageHref(Math.max(1, currentPage - 1))}
        scroll={false}
        className={currentPage === 1 ? "pointer-events-none opacity-30" : ""}>
        <Box
          sx={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            marginRight: "8px",
            background: "linear-gradient(315deg, #473D97 0%, #E42D5D 100%)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(228, 45, 93, 0.35)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.1)",
              opacity: 0.9,
            },
          }}>
          <ChevronLeftIcon />
        </Box>
      </Link>

      {/* PAGE NUMBERS */}
      <Box className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <Link
              key={page}
              href={getPageHref(page)}
              scroll={false}
              className="no-underline">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px", // Soft UI rounded square
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  // Active Styles: Your specific Red/Pink Gradient
                  background: isActive
                    ? "linear-gradient(315deg, #473D97 0%, #E42D5D 100%)"
                    : "#fff",
                  color: isActive ? "#fff" : "#344767",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "14px",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(228, 45, 93, 0.35)"
                    : "0 2px 4px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: isActive ? "none" : "translateY(-2px)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  },
                }}>
                {page}
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* NEXT BUTTON (Gradient Circle) */}
      <Link
        href={getPageHref(Math.min(totalPages, currentPage + 1))}
        scroll={false}
        className={
          currentPage === totalPages ? "pointer-events-none opacity-30" : ""
        }>
        <Box
          sx={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            marginLeft: "8px",
            background: "linear-gradient(315deg, #473D97 0%, #E42D5D 100%)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(228, 45, 93, 0.35)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.1)",
              opacity: 0.9,
            },
          }}>
          <ChevronRightIcon fontSize="small" />
        </Box>
      </Link>
    </Box>
  );
};
