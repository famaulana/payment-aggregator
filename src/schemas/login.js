import * as yup from "yup";

export const LoginSchema = {
  username: yup.object().required("Kolom tidak boleh kosong!"),
  password: yup.object().required("Kolom tidak boleh kosong!"),
};
