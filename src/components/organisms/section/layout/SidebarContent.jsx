import React, { useEffect, useState } from "react";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { MASTER_MAIN_MENU, MASTER_SETTINGS } from "@/utils/constants";
import { Logout } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";

/**
 * 1. MOVE SUB-COMPONENTS OUTSIDE
 * This prevents the "Cannot create components during render" error.
 */
const SidebarItem = ({ item, isActive, href, onNavigate }) => {
  const content = (
    <ListItemButton
      selected={isActive}
      className={`rounded-xl mx-2 transition-all ${isActive ? "bg-white shadow-md" : ""}`}
      sx={{
        "&.Mui-selected": {
          bgcolor: "white !important",
          borderRadius: "8px",
        },
      }}>
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${
          item.text === "Logout"
            ? "bg-white shadow-sm border border-gray-100 text-[#E42D5D]"
            : isActive
              ? "bg-linear-to-tl from-purple-700 to-pink-500 text-white"
              : "bg-white shadow-sm border border-gray-100 text-[#3A416F]"
        }`}>
        <span className="flex items-center justify-center">
          {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
        </span>
      </div>
      <Typography
        className={`text-sm ${isActive ? "font-bold text-[#344767]" : "text-slate-500 font-medium"}`}>
        {item.text}
      </Typography>
    </ListItemButton>
  );

  // If it's logout, we use a div/button instead of a Link to handle the event properly
  if (item.text === "Logout") {
    return (
      <ListItem disablePadding className="mb-2" onClick={onNavigate}>
        {content}
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding className="mb-2">
      <Link href={href} className="w-full no-underline">
        {content}
      </Link>
    </ListItem>
  );
};

const SidebarContent = ({ router }) => {
  const { mutate: logout } = useLogout();

  const onLogout = (e) => {
    e.preventDefault();
    logout();
  };

  // Inside SidebarContent
  const userRaw = getCookie("user");
  let user = {};

  try {
    user = userRaw ? JSON.parse(userRaw) : null;
  } catch (e) {
    console.error("Reliability error: Could not parse user data", e);
  }

  // Compute menus safely
  const mainMenuList = user?.permissions
    ? MASTER_MAIN_MENU.filter((item) =>
        user.permissions.some((p) => p.includes(item.key)),
      )
    : [];

  const settingsList = user?.permissions
    ? MASTER_SETTINGS.filter((item) =>
        user.permissions.some((p) => p.includes(item.key)),
      )
    : [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      className="p-4">
      <div>
        <div className="flex items-center px-4 py-6">
          <Image
            src="/images/logo.png"
            width={32}
            height={32}
            alt="Logo"
            style={{ objectFit: "contain" }}
          />
          <span className="font-bold text-[#344767] ml-3 tracking-tight text-sm">
            Juara Digital Platform
          </span>
        </div>

        <hr className="h-px mb-6 bg-transparent bg-linear-to-r from-transparent via-black/10 to-transparent border-0" />

        {mainMenuList.length > 0 && (
          <div className="mb-4">
            <p className="text-slate-400 font-bold text-[11px] px-4 uppercase tracking-widest mb-2">
              Main Menu
            </p>
            <List>
              {mainMenuList.map((item) => {
                const href = `/${item.text.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <SidebarItem
                    key={item.text}
                    item={item}
                    isActive={router.pathname.startsWith(href)}
                    href={href}
                  />
                );
              })}
            </List>
          </div>
        )}

        {settingsList.length > 0 && (
          <div>
            <p className="text-slate-400 font-bold text-[11px] px-4 uppercase tracking-widest mb-2">
              Settings
            </p>
            <List>
              {settingsList.map((item) => {
                const href = `/${item.text === "Logs & Audit" ? "logs-audit" : item.text.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <SidebarItem
                    key={item.text}
                    item={item}
                    isActive={router.pathname === href}
                    href={href}
                  />
                );
              })}
            </List>
          </div>
        )}
      </div>

      <List>
        <SidebarItem
          item={{ text: "Logout", icon: <Logout /> }}
          isActive={false}
          href="#"
          onNavigate={onLogout}
        />
      </List>
    </Box>
  );
};

export default SidebarContent;
