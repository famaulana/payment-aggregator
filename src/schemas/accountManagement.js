"use no memo";
import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
  username: yup.string().required("Kolom tidak boleh kosong!"),
  full_name: yup.string().required("Kolom tidak boleh kosong!"),
  email: yup
    .string()
    .required("Kolom tidak boleh kosong!")
    .email("Format email salah!")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must contain a valid domain (e.g., .com)",
    ),
  password: yup
    .string()
    .required("Kolom tidak boleh kosong!")
    .min(8, "Password must be at least 8 characters"),
  password_confirmation: yup
    .string()
    .required("Kolom tidak boleh kosong!")
    .min(8, "Password must be at least 8 characters")
    .oneOf([yup.ref("password")], "Password not matches!"),
  role: yup.string().required("Pilih salah satu role!"),
  status: yup.bool(),
  client_code: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  client_name: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  business_type: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  bank_name: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  bank_account_number: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  bank_account_holder_name: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  bank_branch: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  pic_name: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  pic_position: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  pic_phone: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  pic_email: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  company_phone: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  company_email: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  province_id: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  city_id: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  address: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
  postal_code: yup.string().when("role", {
    is: (val) => val == "client",
    then: (schema) => schema.required("Kolom tidak boleh kosong!"),
    otherwise: (schema) => schema.nullable(),
  }),
});
