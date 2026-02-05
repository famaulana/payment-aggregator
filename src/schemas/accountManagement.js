"use no memo";
import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
  name: yup.string().required("Kolom tidak boleh kosong!"),
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
  role: yup.object().required("Pilih salah satu role!"),
  status: yup.bool(),
});
