import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useProvinces } from "@/features/location/hooks/useProvinces";
import { useEffect } from "react";

export const SubFormClient = ({ methods }) => {
  const { loadOptions: loadProvinceOptions } = useProvinces();
  const { loadOptions: loadCityOptions } = useCities();

  const { watch, control } = methods;

  const province = watch("role_data.province_id");
  const city = watch("city_id");

  useEffect(() => {
    console.log(province);
  }, [province]);

  return (
    <div className="flex flex-col space-y-4">
      <TextFieldInput
        name="role_data.client_code"
        control={control}
        title="Client Code"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.client_name"
        control={control}
        title="Client Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.business_type"
        control={control}
        title="Business Type"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_name"
        control={control}
        title="Bank Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_account_number"
        control={control}
        title="Bank Account Number"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_account_holder_name"
        control={control}
        title="Bank Account Holder Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_branch"
        control={control}
        title="Bank Branch"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_name"
        control={control}
        title="PIC Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_position"
        control={control}
        title="PIC Position"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_phone"
        control={control}
        title="PIC Phone"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_email"
        control={control}
        title="PIC Email"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.company_phone"
        control={control}
        title="Company Phone"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.company_email"
        control={control}
        title="Company Email"
        variant="horizontal"
      />
      <RHFAsyncSelect
        name="role_data.province_id"
        control={control}
        fetchFn={loadProvinceOptions}
        title="Province"
        variant="horizontal"
        disa
      />
      <RHFAsyncSelect
        name="role_data.city_id"
        control={control}
        fetchFn={loadCityOptions}
        disabled={!province}
        title="City"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.address"
        control={control}
        title="Address"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.postal_code"
        control={control}
        title="Postal Code"
        variant="horizontal"
      />
    </div>
  );
};
