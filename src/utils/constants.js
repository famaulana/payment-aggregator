import {
  CreditCard,
  LocalPostOffice,
  Person,
  Settings,
  Shop2,
} from "@mui/icons-material";

export const MASTER_MAIN_MENU = [
  { icon: <Shop2 />, text: "Dashboard", key: "" },
  { icon: <LocalPostOffice />, text: "Transaction", key: "transaction" },
  { icon: <Settings />, text: "MDR Settings", key: "mdr" },
  { icon: <CreditCard />, text: "Settlement", key: "settlement" },
];

export const MASTER_SETTINGS = [
  { icon: <Person />, text: "Account Management", key: "all_users" },
  {
    icon: <LocalPostOffice />,
    text: "Merchant Management",
    key: "merchant_user",
  },
  { icon: <Settings />, text: "Logs & Audit", key: "logs" },
];
