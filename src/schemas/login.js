"use no memo";
import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required("Kolom tidak boleh kosong!"),
  password: yup.string().required("Kolom tidak boleh kosong!"),
});
