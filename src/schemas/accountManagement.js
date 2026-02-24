"use no memo";
import * as yup from "yup";

const clientFields = yup
  .object({
    client_code: yup.string().required("Kolom tidak boleh kosong!"),
    client_name: yup.string().required("Kolom tidak boleh kosong!"),
    business_type: yup.string().required("Kolom tidak boleh kosong!"),
    bank_name: yup.string().required("Kolom tidak boleh kosong!"),
    bank_account_number: yup.string().required("Kolom tidak boleh kosong!"),
    bank_account_holder_name: yup
      .string()
      .required("Kolom tidak boleh kosong!"),
    bank_branch: yup.string().required("Kolom tidak boleh kosong!"),
    pic_name: yup.string().required("Kolom tidak boleh kosong!"),
    pic_position: yup.string().required("Kolom tidak boleh kosong!"),
    pic_phone: yup.string().required("Kolom tidak boleh kosong!"),
    pic_email: yup.string().required("Kolom tidak boleh kosong!"),
    company_phone: yup.string().required("Kolom tidak boleh kosong!"),
    company_email: yup.string().required("Kolom tidak boleh kosong!"),
    province_id: yup.object().required("Kolom tidak boleh kosong!"),
    city_id: yup.object().required("Kolom tidak boleh kosong!"),
    address: yup.string().required("Kolom tidak boleh kosong!"),
    postal_code: yup.string().required("Kolom tidak boleh kosong!"),
  })
  .nullable();

const headquarterFields = yup
  .object({
    head_quarter_code: yup.string().required("Kolom tidak boleh kosong!"),
    head_quarter_name: yup.string().required("Kolom tidak boleh kosong!"),
    province_id: yup.number().required("Pilih salah satu provinsi!"),
    city_id: yup.number().required("Pilih salah satu kota!"),
    district_id: yup.number().required("Pilih salah satu distrik!"),
    sub_district_id: yup.number().required("Pilih salah satu sub distrik!"),
    address: yup.string().required("Kolom tidak boleh kosong!"),
    postal: yup.string().required("Kolom tidak boleh kosong!"),
  })
  .nullable();

const merchantFields = yup
  .object({
    merchant_code: yup.string().required("Kolom tidak boleh kosong!"),
    merchant_name: yup.string().required("Kolom tidak boleh kosong!"),
    province_id: yup.number().required("Pilih salah satu provinsi!"),
    city_id: yup.number().required("Pilih salah satu kota!"),
    district_id: yup.number().required("Pilih salah satu distrik!"),
    sub_district_id: yup.number().required("Pilih salah satu sub distrik!"),
    address: yup.string().required("Kolom tidak boleh kosong!"),
    postal: yup.string().required("Kolom tidak boleh kosong!"),
  })
  .nullable();

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
  role_data: yup.mixed().when("role", (role, schema) => {
    switch (
      role[0] // role is passed as an array [value]
    ) {
      case "client":
        return clientFields;
      case "head_quarter":
        return headquarterFields;
      case "merchant":
        return merchantFields;
      default:
        return schema.nullable();
    }
  }),
});
