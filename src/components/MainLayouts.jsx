import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { DefaultButton } from "./atoms/button/DefaultButton";
import {
  CreditCard,
  LocalPostOffice,
  Settings,
  Shop,
  Shop2,
} from "@mui/icons-material";
import RoleProtector from "./RoleGuard";
import { useAuthStore } from "@/store/useAuthStore";
import { MASTER_MAIN_MENU, MASTER_SETTINGS } from "@/utils/constants";
import { getCookie } from "cookies-next";
import Head from "next/head";

const DRAWER_WIDTH = 300;

export const MainLayout = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathName = router.pathname.replace("/", "") || "Dashboard";
  const spacedPathName = pathName.replace("-", " ") || "Dashboard";
  const modifiedPathName = spacedPathName.replace("/", " > ");

  /* For Head title  */
  const pathNameHead = router.pathname.split("/").filter(Boolean);
  const parentSegmentHead = pathNameHead[0] || "Dashboard";
  const formattedTitle =
    parentSegmentHead.charAt(0).toUpperCase() + parentSegmentHead.slice(1);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <RoleProtector>
      <Head>
        <title>{formattedTitle} - PG LIT</title>
      </Head>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
        {/* 1. SIDEBAR (DRAWER) */}
        <Box
          component="nav"
          sx={{ width: { xl: DRAWER_WIDTH }, flexShrink: { xl: 0 } }}>
          {/* Mobile Version */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", xl: "none" },
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                border: "none",
              },
            }}>
            <SidebarContent router={router} />
          </Drawer>

          {/* Desktop Version */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", xl: "block" },
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                border: "none",
                bgcolor: "transparent",
                //   p: 2,
              },
            }}
            open>
            <Box className="h-full rounded-2xl shadow-soft-xl">
              <SidebarContent router={router} />
            </Box>
          </Drawer>
        </Box>

        {/* 2. MAIN CONTENT AREA (Sits to the right of Sidebar) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { xl: `calc(100% - ${DRAWER_WIDTH}px)` },
            minWidth: 0, // Prevents flex-child overflow
          }}>
          {/* TOP NAVBAR */}
          <Box className="flex flex-col md:flex-row items-center justify-between mb-6 px-4 py-2 bg-transparent">
            {/* Breadcrumbs / Title */}
            <Box>
              <Typography
                variant="h6"
                className="font-bold text-slate-700 capitalize">
                {modifiedPathName}
              </Typography>
            </Box>

            {/* Search & Actions */}
            <Box className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Mobile Hamburger Toggle */}
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ display: { xl: "none" } }}>
                <MenuIcon />
              </IconButton>

              {/* Search Bar */}
              {/* <Box className="flex items-center bg-white border border-gray-300 rounded-lg px-2 py-1 shadow-sm">
                <SearchIcon className="text-gray-400 mr-2" fontSize="small" />
                <InputBase placeholder="Type here..." className="text-sm" />
              </Box> */}

              {/* Icons */}
              <Box className="flex items-center space-x-2 text-slate-500">
                <IconButton size="small">
                  <PersonIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <SettingsIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <NotificationsIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* PAGE CONTENT */}
          <Box className="w-full">{children}</Box>
        </Box>
      </Box>
    </RoleProtector>
  );
};

// Extracted Sidebar Content to keep code clean
const SidebarContent = ({ router }) => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const { mutate: logout } = useLogout();

  // 1. Wait for Mount to avoid Hydration Error
  useEffect(() => {
    const userRaw = getCookie("user");
    if (userRaw) {
      try {
        setUser(JSON.parse(userRaw));
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }
    setMounted(true);
  }, []);

  // 2. Compute menus only if we have a user and are mounted
  const mainMenuList =
    mounted && user?.permissions
      ? MASTER_MAIN_MENU.filter((item) =>
          user.permissions.some((p) => p.includes(item.key)),
        )
      : [];

  const settingsList =
    mounted && user?.permissions
      ? MASTER_SETTINGS.filter((item) =>
          user.permissions.some((p) => p.includes(item.key)),
        )
      : [];

  // 3. Prevent the "Flash of Wrong Content"
  if (!mounted) {
    return <div className="p-4">Loading Sidebar...</div>;
  }

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
            src={"/images/logo.png"}
            width={48}
            height={48}
            alt="Logo"
            style={{ objectFit: "contain" }} // Using style for Next.js 13+ compatibility
          />
          <span className="font-semibold text-[#344767] ml-2">
            Juara Digital Platform
          </span>
        </div>

        <hr className="h-px mb-4 bg-transparent bg-linear-to-r from-transparent via-black/40 to-transparent border-0" />

        {/* --- MAIN MENU --- */}
        {mainMenuList.length > 0 && (
          <>
            <span className="text-slate-600 font-semibold text-sm px-4 uppercase">
              Main Menu
            </span>
            <List>
              {mainMenuList.map((item) => {
                const href = `/${item.text.toLowerCase().replace(/\s+/g, "-")}`;
                const isActive = router.pathname === href;
                return (
                  <SidebarItem
                    key={item.text}
                    item={item}
                    isActive={isActive}
                    href={href}
                  />
                );
              })}
            </List>
          </>
        )}

        {/* --- SETTINGS --- */}
        {settingsList.length > 0 && (
          <>
            <span className="text-slate-600 font-semibold text-sm px-4 uppercase mt-4 block">
              Settings
            </span>
            <List>
              {settingsList.map((item) => {
                const href = `/${item.text == "Logs & Audit" ? "logs-audit" : item.text.toLowerCase().replace(/\s+/g, "-")}`;
                const isActive = router.pathname === href;
                return (
                  <SidebarItem
                    key={item.text}
                    item={item}
                    isActive={isActive}
                    href={href}
                  />
                );
              })}
            </List>
          </>
        )}
      </div>

      <DefaultButton onClick={logout} className="mt-auto">
        Logout
      </DefaultButton>
    </Box>
  );
};

// Sub-component to clean up your map functions
const SidebarItem = ({ item, isActive, href }) => (
  <ListItem disablePadding className="mb-2">
    <Link href={href} className="w-full no-underline">
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
            isActive
              ? "bg-linear-to-tl from-purple-700 to-pink-500 text-white"
              : "bg-white shadow-sm border border-gray-100"
          }`}>
          <span className="text-[10px]">{item.icon}</span>
        </div>
        <Typography
          className={`text-sm ${isActive ? "font-bold text-[#344767]" : "text-slate-500"}`}>
          {item.text}
        </Typography>
      </ListItemButton>
    </Link>
  </ListItem>
);
