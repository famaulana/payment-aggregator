import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { MASTER_MAIN_MENU, MASTER_SETTINGS } from "@/utils/constants";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";

const SidebarContent = ({ router }) => {
  const { mutate: logout } = useLogout();

  const userRaw = getCookie("user");
  let user = {};

  try {
    user = userRaw ? JSON.parse(userRaw) : null;
  } catch (e) {
    console.error("Reliability error: Could not parse user data", e);
  }

  // 2. Compute menus only if we have a user and are mounted
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
      </div>

      <DefaultButton onClick={logout} className="mt-auto">
        Logout
      </DefaultButton>
    </Box>
  );
};

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

export default SidebarContent;
