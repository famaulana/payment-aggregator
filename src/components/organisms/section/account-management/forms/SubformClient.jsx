import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useProvinces } from "@/features/location/hooks/useProvinces";

export const SubFormClient = ({ control }) => {
  const { loadOptions: loadProvinceOptions } = useProvinces();
  const { loadOptions: loadCityOptions } = useCities();

  return (
    <>
      <TextFieldInput
        name="client_code"
        control={control}
        title="Client Code"
        variant="horizontal"
      />
      <TextFieldInput
        name="client_name"
        control={control}
        title="Client Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="business_type"
        control={control}
        title="Business Type"
        variant="horizontal"
      />
      <TextFieldInput
        name="bank_name"
        control={control}
        title="Bank Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="bank_account_number"
        control={control}
        title="Bank Account Number"
        variant="horizontal"
      />
      <TextFieldInput
        name="bank_account_holder_name"
        control={control}
        title="Bank Account Holder Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="bank_branch"
        control={control}
        title="Bank Branch"
        variant="horizontal"
      />
      <TextFieldInput
        name="pic_name"
        control={control}
        title="PIC Name"
        variant="horizontal"
      />
      <TextFieldInput
        name="pic_position"
        control={control}
        title="PIC Position"
        variant="horizontal"
      />
      <TextFieldInput
        name="pic_phone"
        control={control}
        title="PIC Phone"
        variant="horizontal"
      />
      <TextFieldInput
        name="pic_email"
        control={control}
        title="PIC Email"
        variant="horizontal"
      />
      <TextFieldInput
        name="company_phone"
        control={control}
        title="Company Phone"
        variant="horizontal"
      />
      <TextFieldInput
        name="company_email"
        control={control}
        title="Company Email"
        variant="horizontal"
      />
      <RHFAsyncSelect
        name="province_id"
        control={control}
        fetchFn={loadProvinceOptions}
        title="Province"
        variant="horizontal"
      />
      <RHFAsyncSelect
        name="city_id"
        control={control}
        fetchFn={loadCityOptions}
        title="City"
        variant="horizontal"
      />
      <TextFieldInput
        name="address"
        control={control}
        title="Address"
        variant="horizontal"
      />
      <TextFieldInput
        name="postal_code"
        control={control}
        title="Postal Code"
        variant="horizontal"
      />
    </>
  );
};
