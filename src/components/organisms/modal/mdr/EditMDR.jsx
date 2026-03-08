import React, { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { getUserSchema } from "@/schemas/accountManagement";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { FormBuilder } from "../../builder";
import { useCreateUser } from "@/features/users/hooks/useCreateUser";
import { Divider } from "@mui/material";

const EditMDRModal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const { mutate: createUser } = useCreateUser();

  const [active, setActive] = useState(false);

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
    resolver: yupResolver(getUserSchema),
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
              <div className="grid gric-cols-1 gap-4">
                <TextFieldInput
                  variant="horizontal"
                  name="username"
                  title="PG Fee"
                  placeholder="john_doe"
                  control={control}
                />
                <TextFieldInput
                  variant="horizontal"
                  name="username"
                  title="Our Fee"
                  placeholder="john_doe"
                  control={control}
                />
                <Divider />
              </div>
            ),
          },
          {
            component: (
              <TextFieldInput
                variant="horizontal"
                name="full_name"
                title="Total MDR"
                placeholder="John Doe"
                disabled={true}
                control={control}
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

export default EditMDRModal;
