import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "shop" },
  { label: "Tables", href: "/tables", icon: "office" },
  { label: "Billing", href: "/billing", icon: "credit-card" },
  { label: "Profile", href: "/profile", icon: "customer-support" },
];

export const MainLayout = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Content of the sidebar
  const drawerContent = (
    <Box className="h-full bg-white p-4">
      {/* Logo Section */}
      <div className="flex items-center px-4 py-6">
        <img src="/img/logo-ct.png" className="h-8 mr-2" alt="logo" />
        <span className="font-bold text-slate-700">Soft UI Dashboard</span>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      {/* Navigation List */}
      <List className="mt-4">
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding className="mb-2">
              <Link href={item.href} className="w-full no-underline">
                <ListItemButton
                  selected={isActive}
                  className={`rounded-xl transition-all duration-200 mx-2 ${
                    isActive ? "bg-white shadow-soft-xl" : "hover:bg-gray-50"
                  }`}
                  sx={{
                    "&.Mui-selected": { backgroundColor: "white !important" },
                  }}>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg mr-3 shadow-soft-2xl ${
                      isActive
                        ? "bg-gradient-to-tl from-purple-700 to-pink-500 text-white"
                        : "bg-white text-slate-700"
                    }`}>
                    <i className={`ni ni-${item.icon} text-xs`}></i>
                  </div>
                  <span
                    className={`text-sm ${isActive ? "font-bold text-slate-700" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Mobile Menu Trigger */}
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1200,
          display: { xl: "none" },
        }}>
        <MenuIcon />
      </IconButton>

      {/* SIDEBAR FOR MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: "block", xl: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            border: "none",
            backgroundColor: "transparent",
          },
        }}>
        {drawerContent}
      </Drawer>

      {/* SIDEBAR FOR DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", xl: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            border: "none",
            p: 2,
            backgroundColor: "transparent",
          },
        }}
        open>
        <div className="h-[calc(100vh-32px)] bg-white rounded-2xl shadow-soft-xl overflow-hidden">
          {drawerContent}
        </div>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xl: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 8, xl: 0 },
        }}>
        {children}
      </Box>
    </Box>
  );
};
