import * as yup from "yup";

// Reusable regex patterns
const PHONE_REGEX = /^[0-9]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Sub-Schemas ---

const adminFields = yup.object({
  code: yup.string().required("Admin code is required!"),
  name: yup.string().required("Admin name is required!"),
  business_type: yup.string().required("Please select a business type!"),
  pic_name: yup.string().required("PIC name is required!"),
  pic_position: yup.string().required("PIC position is required!"),
  pic_phone: yup
    .string()
    .required("PIC phone number is required!")
    .matches(PHONE_REGEX, "Only numbers are allowed"),
  pic_email: yup
    .string()
    .required("PIC email is required!")
    .matches(EMAIL_REGEX, "Invalid PIC email format"),
  company_phone: yup
    .string()
    .required("Company phone is required!")
    .matches(PHONE_REGEX, "Only numbers are allowed")
    .max(20, "Maximum 20 characters allowed"),
  company_email: yup
    .string()
    .required("Company email is required!")
    .matches(EMAIL_REGEX, "Invalid company email format"),
  province_id: yup.mixed().required("Province is required!"),
  city_id: yup.mixed().required("City is required!"),
  address: yup.string().required("Full address is required!"),
  postal_code: yup
    .string()
    .required("Postal code is required!")
    .matches(PHONE_REGEX, "Postal code must be numeric")
    .max(10, "Postal code cannot exceed 10 characters"),
});

const clientFields = yup.object({
  client_code: yup.string().required("Client code is required!"),
  client_name: yup.string().required("Client name is required!"),
  business_type: yup.string().required("Please select a business type!"),
  bank_name: yup.string().required("Bank name is required!"),
  bank_account_number: yup
    .string()
    .required("Account number is required!")
    .matches(PHONE_REGEX, "Account number must be numeric"),
  bank_account_holder_name: yup
    .string()
    .required("Account holder name is required!"),
  bank_branch: yup.string().required("Bank branch is required!"),
  pic_name: yup.string().required("PIC name is required!"),
  pic_position: yup.string().required("PIC position is required!"),
  pic_phone: yup
    .string()
    .required("PIC phone is required!")
    .matches(PHONE_REGEX, "Only numbers are allowed"),
  pic_email: yup
    .string()
    .required("PIC email is required!")
    .matches(EMAIL_REGEX, "Invalid email format"),
  company_phone: yup
    .string()
    .required("Office phone is required!")
    .matches(PHONE_REGEX, "Only numbers are allowed"),
  company_email: yup
    .string()
    .required("Office email is required!")
    .matches(EMAIL_REGEX, "Invalid email format"),
  province_id: yup.mixed().required("Province is required!"),
  city_id: yup.mixed().required("City is required!"),
  address: yup.string().required("Address is required!"),
  postal_code: yup
    .string()
    .required("Postal code is required!")
    .matches(PHONE_REGEX, "Only numbers are allowed"),
});

const headquarterFields = yup.object({
  head_quarter_code: yup.string().required("HQ code is required!"),
  head_quarter_name: yup.string().required("HQ name is required!"),
  province_id: yup.mixed().required("Province must be selected!"),
  city_id: yup.mixed().required("City must be selected!"),
  district_id: yup.mixed().required("District must be selected!"),
  sub_district_id: yup.mixed().required("Sub-district must be selected!"),
  address: yup.string().required("Full address is required!"),
  postal: yup
    .string()
    .required("Postal code is required!")
    .matches(PHONE_REGEX, "Postal code must be numeric"),
});

const merchantFields = yup.object({
  merchant_code: yup.string().required("Merchant code is required!"),
  merchant_name: yup.string().required("Merchant name is required!"),
  province_id: yup.mixed().required("Province must be selected!"),
  city_id: yup.mixed().required("City must be selected!"),
  district_id: yup.mixed().required("District must be selected!"),
  sub_district_id: yup.mixed().required("Sub-district must be selected!"),
  address: yup.string().required("Full address is required!"),
  postal: yup
    .string()
    .required("Postal code is required!")
    .matches(PHONE_REGEX, "Postal code must be numeric"),
});

// --- Main Schema Factory ---
export const getUserSchema = (isEdit = false) => {
  // Helper: Only apply rules if we are NOT in edit mode
  const applyIfCreate = (schema, rules) => {
    return isEdit ? schema.nullable().notRequired() : rules(schema);
  };

  return yup.object().shape({
    username: applyIfCreate(yup.string(), (s) =>
      s.required("Username is required!").min(4, "Min 4 characters"),
    ),

    full_name: applyIfCreate(yup.string(), (s) =>
      s.required("Full name is required!"),
    ),

    email: applyIfCreate(yup.string(), (s) =>
      s.required("Email is required!").matches(EMAIL_REGEX, "Invalid format"),
    ),

    role: yup.string().required("A role must be selected!"),

    // Password logic: We want MIN validation even on Edit IF they type something
    password: yup
      .string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .when([], {
        is: () => isEdit,
        then: (s) =>
          s.notRequired().min(8, "Password must be at least 8 characters"),
        otherwise: (s) => s.required("Password is required!").min(8),
      }),

    // Role Data: This is the most important part
    role_data: yup.mixed().when("role", ([role], schema) => {
      // If editing, we return a blank schema that ignores all internal requirements
      if (isEdit) return yup.mixed().nullable().notRequired();

      switch (role) {
        case "system_owner_admin":
          return adminFields;
        case "client":
          return clientFields;
        // ... rest of cases
        default:
          return yup.mixed().nullable().notRequired();
      }
    }),
  });
};
