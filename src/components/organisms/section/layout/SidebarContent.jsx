import { useLogout } from "@/features/auth/hooks/useLogout";
import { MASTER_MAIN_MENU, MASTER_SETTINGS } from "@/utils/constants";
import { Logout } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SidebarContent = ({ router }) => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const { mutate: logout } = useLogout();

  const onLogout = (e) => {
    e.preventDefault();

    logout();
  };

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
      <List>
        <SidebarItem
          key="logout"
          item={{
            text: "Logout",
            icon: <Logout />,
          }}
          isActive={false}
          href="/dashboard"
          onNavigate={onLogout}
        />
      </List>
    </Box>
  );
};

// Sub-component to clean up your map functions
const SidebarItem = ({ item, isActive, href, ...props }) => (
  <ListItem disablePadding className="mb-2">
    <Link href={href} className="w-full no-underline" {...props}>
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
          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${item.text == "Logout" ? "bg-white shadow-sm border border-gray-100 text-[#E42D5D]" : ""} 
            ${
              isActive && item.text != "Logout"
                ? "bg-linear-to-tl from-purple-700 to-pink-500 text-white"
                : "bg-white shadow-sm border border-gray-100 text-[#3A416F]"
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

export default SidebarContent;
