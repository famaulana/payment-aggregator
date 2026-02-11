import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useModalStore } from "@/store/useModalStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { CreateUserSchema } from "@/schemas/accountManagement";
import { PasswordTextField } from "@/components/molecules/form-inputs/PasswordTextField";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { FormBuilder } from "../builder";
import { RHFSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { useCreateUser } from "@/features/users/hooks/useCreateUser";
import { SliderSwitch } from "@/components/molecules/form-inputs/Switch";

const CreateUserModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { mutate: createUser } = useCreateUser();

  const [active, setActive] = useState(false);

  const label = {
    title: "isActive?",
    on: "ON",
    off: "OFF",
  };

  const options = [
    { label: "Admin", value: "admin" },
    {
      entity_type: "client",
      entity_id: 1,
      label: "Client",
      value: "client_admin",
    },
    { label: "Merchant", value: "merchant" },
    { label: "Headquarter", value: "headquarter" },
  ];

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(CreateUserSchema),
  });

  const { control } = methods;

  const handleSubmit = (value) => {
    const selectedOption = options.find((item) => item.value == value.role);
    const payload = {
      ...value,
      entity_type: selectedOption.entity_type,
      entity_id: selectedOption.entity_id,
      status: active ? "active" : "inactive",
    };

    createUser(payload);
  };

  const handleActive = (val) => {
    setActive(val);
  };

  return (
    <div className="flex w-full">
      <FormBuilder
        methods={methods}
        className="w-full flex flex-col space-y-4"
        onSubmit={handleSubmit}
        fields={[
          {
            component: (
              <TextFieldInput
                variant="horizontal"
                name="username"
                title="Username"
                placeholder="john_doe"
                control={control}
              />
            ),
          },
          {
            component: (
              <TextFieldInput
                variant="horizontal"
                name="full_name"
                title="Full Name"
                placeholder="John Doe"
                control={control}
              />
            ),
          },
          {
            component: (
              <TextFieldInput
                variant="horizontal"
                name="email"
                title="Email"
                placeholder="Example@email.com"
                control={control}
              />
            ),
          },
          {
            component: (
              <PasswordTextField
                name="password"
                variant="horizontal"
                title="Password"
                placeholder="At least 8 character"
                control={control}
              />
            ),
          },
          {
            component: (
              <PasswordTextField
                name="password_confirmation"
                variant="horizontal"
                title="Password Confirmation"
                placeholder="At least 8 character"
                control={control}
              />
            ),
          },
          {
            component: (
              <RHFSelect
                options={options}
                name="role"
                control={control}
                placeholder="Pilih salah satu role"
                title="Role"
                variant="horizontal"
                sx={{
                  "& .MuiSelect-select": { padding: "16.5px 16px" },
                }}
              />
            ),
          },
          {
            component: (
              <SliderSwitch
                status={active}
                label={label}
                onChange={handleActive}
              />
            ),
          },
          {
            component: (
              <div className="flex gap-4 space-x-4 w-full px-6 mt-2 items-center">
                <DefaultButton
                  colorType="danger"
                  sx={{ marginTop: 0 }}
                  onClick={closeModal}>
                  Cancel
                </DefaultButton>
                <DefaultButton
                  colorType="success"
                  sx={{ marginTop: 0 }}
                  type="submit">
                  Save Changes
                </DefaultButton>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CreateUserModal;
