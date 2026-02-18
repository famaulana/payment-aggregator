import React, { useState } from "react";
import { useRouter } from "next/router";
import { Drawer, Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RoleProtector from "./RoleGuard";
import Head from "next/head";
import dynamic from "next/dynamic";
import SidebarContent from "./organisms/section/layout/SidebarContent";

const ClientOnlySidebar = dynamic(() => Promise.resolve(SidebarContent), {
  ssr: false,
});

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
            <ClientOnlySidebar router={router} />
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
              <ClientOnlySidebar router={router} />
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
