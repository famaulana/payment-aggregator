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

export const USER_FORM_DEFAULT = {
  username: "",
  full_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "", // or "" if the user chooses it first
  role_data: {
    client_code: "",
    client_name: "",
    headquarter_code: "",
    headquarter_name: "",
    merchant_code: "",
    merchant_name: "",
    business_type: "",
    bank_name: "",
    bank_account_number: "",
    bank_account_holder_name: "",
    bank_branch: "",
    pic_name: "",
    pic_position: "",
    pic_phone: "",
    pic_email: "",
    company_phone: "",
    company_email: "",
    province_id: null,
    city_id: null,
    district_id: null,
    sub_district_id: null,
    address: "",
    postal_code: "",
  },
};
