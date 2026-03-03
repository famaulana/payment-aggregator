import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { PasswordTextField } from "@/components/molecules/form-inputs/PasswordTextField";
import { RHFSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { SliderSwitch } from "@/components/molecules/form-inputs/Switch";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { FormBuilder } from "@/components/organisms/builder";
import CardWithTitle from "@/components/organisms/cards/CardWithTitle";
import { SubFormAdmin } from "@/components/organisms/section/account-management/forms/SubformAdmin";
import { SubFormClient } from "@/components/organisms/section/account-management/forms/SubformClient";
import { SubFormHeadQuarter } from "@/components/organisms/section/account-management/forms/SubformHeadQuarter";
import { SubFormMerchant } from "@/components/organisms/section/account-management/forms/SubformMerchant";
import { useCreateUser } from "@/features/users/hooks/useCreateUser";
import { useGetUserDetail } from "@/features/users/hooks/useGetUserDetail";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import { getUserSchema } from "@/schemas/accountManagement";
import { USER_FORM_DEFAULT } from "@/utils/constants";
import { cleanObject } from "@/utils/formatData";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const CreateEditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: detailData } = useGetUserDetail(id);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  const [role, setRole] = useState("");
  const [active, setActive] = useState(false);

  const isEdit = !!id;

  const label = {
    title: "isActive?",
    on: "ON",
    off: "OFF",
  };

  const options = [
    { label: "Admin", value: "system_owner_admin" },
    {
      label: "Client",
      value: "client",
    },
    { label: "Merchant", value: "merchant" },
    { label: "Headquarter", value: "head_quarter" },
  ];

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(getUserSchema(isEdit)),
    defaultValues: USER_FORM_DEFAULT,
  });

  const { control, watch } = methods;

  const handleSubmit = (value) => {
    const payload = {
      ...value,
      ...value.role_data,
      province_id: value.role_data?.province_id?.value,
      city_id: value.role_data?.city_id?.value,
      district_id: value.role_data?.district_id?.value,
      sub_district_id: value.role_data?.sub_district_id?.value,
      role_data: null,
      entity_type:
        value?.role == "system_owner_admin" ? "system_owner" : value?.role,
      status: active ? "active" : "inactive",
    };

    const cleanPayload = cleanObject({
      ...payload,
      role: value.role ?? detailData?.role,
    });

    if (isEdit) {
      // console.log(cleanPayload);
      updateUser(id, cleanPayload);
    } else {
      createUser(payload);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleActive = (val) => {
    setActive(val);
  };

  const roleWatch = watch("role");
  const province = watch("role_data.province_id");
  const city = watch("role_data.city_id");
  const district = watch("role_data.district_id");

  const fields = useMemo(
    () => [
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
            value={role ?? ""}
            onChange={(e) => {
              e.preventDefault();
              setRole(e.target.value);
            }}
            placeholder="Pilih salah satu role"
            title="Role"
            variant="horizontal"
            sx={{
              "& .MuiSelect-select": { padding: "16.5px 16px" },
            }}
          />
        ),
      },
      ...(roleWatch == "system_owner_admin"
        ? [
            {
              component: (
                <SubFormAdmin
                  key="client-subform"
                  methods={methods}
                  province={province}
                />
              ),
            },
          ]
        : []),
      ...(roleWatch == "client"
        ? [
            {
              component: (
                <SubFormClient
                  key="client-subform"
                  methods={methods}
                  province={province}
                />
              ),
            },
          ]
        : []),
      ...(roleWatch == "head_quarter"
        ? [
            {
              component: (
                <SubFormHeadQuarter
                  key="headquarter-subform"
                  methods={methods}
                  province={province}
                  city={city}
                  district={district}
                />
              ),
            },
          ]
        : []),
      ...(roleWatch == "merchant"
        ? [
            {
              component: (
                <SubFormMerchant
                  key="merchant-subform"
                  methods={methods}
                  province={province}
                  city={city}
                  district={district}
                />
              ),
            },
          ]
        : []),
      {
        component: (
          <SliderSwitch status={active} label={label} onChange={handleActive} />
        ),
      },
      {
        component: (
          <div className="flex gap-4 space-x-4 w-full px-6 mt-2 items-center">
            <DefaultButton
              colorType="success"
              sx={{ marginTop: 0 }}
              type="submit">
              Save Changes
            </DefaultButton>
          </div>
        ),
      },
    ],
    [roleWatch, province, city, district],
  );

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4">
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            background: "white",
            color: "#E42D5D",
          }}>
          <ArrowBackOutlined
            sx={{
              fontSize: 20,
              border: "2.25px solid transparent",
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
            }}
            className="font-bold bg-inherit capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            Back{" "}
          </Typography>
        </Button>
      </div>
      <CardWithTitle title={isEdit ? "Edit Data" : "Create Data"}>
        <FormBuilder
          methods={methods}
          className="w-full flex flex-col space-y-4"
          onSubmit={handleSubmit}
          fields={fields}
        />
      </CardWithTitle>
    </div>
  );
};

export default CreateEditUser;
