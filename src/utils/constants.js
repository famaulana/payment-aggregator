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

export const ROLE_OPTIONS = [
  { label: "All Role", value: "" },
  { label: "Client", value: "client" },
  { label: "Headquarter", value: "headquarter" },
  { label: "Merchant", value: "Merchant" },
];

export const STATUS_OPTIONS = [
  { label: "All Activity", value: "" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const STATUS_LOGS_OPTIONS = [
  { label: "All Activity", value: "" },
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export const MERCHANT_OPTIONS = [
  { label: "All Merchant", value: "" },
  { label: "Client", value: "client" },
  { label: "Headquarter", value: "headquarter" },
  { label: "Merchant", value: "Merchant" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { label: "All Payment Method", value: "" },
  { label: "Client", value: "client" },
  { label: "Headquarter", value: "headquarter" },
  { label: "Merchant", value: "Merchant" },
];

export const PAYMENT_GATEWAY_OPTIONS = [
  { label: "All Payment Gateway", value: "" },
  { label: "Client", value: "client" },
  { label: "Headquarter", value: "headquarter" },
  { label: "Merchant", value: "Merchant" },
];
