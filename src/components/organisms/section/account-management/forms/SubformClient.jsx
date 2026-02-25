import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useProvinces } from "@/features/location/hooks/useProvinces";

export const SubFormClient = ({ methods, province }) => {
  const { loadOptions: loadProvinceOptions } = useProvinces();
  const { loadOptions: loadCityOptions } = useCities(true);

  const { control } = methods;

  const isProvinceSelected =
    !!province && (typeof province === "object" ? !!province.value : true);

  return (
    <div className="flex flex-col space-y-4">
      <TextFieldInput
        name="role_data.client_code"
        control={control}
        title="Client Code"
        placeholder="e.g. CLI-001"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.client_name"
        control={control}
        title="Client Name"
        placeholder="Enter client company name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.business_type"
        control={control}
        title="Business Type"
        placeholder="e.g. Retail, Logistics, etc."
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_name"
        control={control}
        title="Bank Name"
        placeholder="e.g. BCA, Mandiri, BNI"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_account_number"
        control={control}
        title="Bank Account Number"
        placeholder="Enter account number"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_account_holder_name"
        control={control}
        title="Bank Account Holder Name"
        placeholder="Enter name as shown in bank book"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.bank_branch"
        control={control}
        title="Bank Branch"
        placeholder="e.g. KCP Sudirman"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_name"
        control={control}
        title="PIC Name"
        placeholder="Enter contact person name"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_position"
        control={control}
        title="PIC Position"
        placeholder="e.g. Manager, Staff"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_phone"
        control={control}
        title="PIC Phone"
        placeholder="e.g. 0812xxxxxx"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.pic_email"
        control={control}
        title="PIC Email"
        placeholder="example@email.com"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.company_phone"
        control={control}
        title="Company Phone"
        placeholder="e.g. 021xxxxxx"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.company_email"
        control={control}
        title="Company Email"
        placeholder="company@email.com"
        variant="horizontal"
      />

      {/* Async Selects */}
      <RHFAsyncSelect
        name="role_data.province_id"
        control={control}
        fetchFn={loadProvinceOptions}
        title="Province"
        placeholder="Search and select province..."
        variant="horizontal"
      />
      <RHFAsyncSelect
        name="role_data.city_id"
        control={control}
        fetchFn={(inputValue) => loadCityOptions(inputValue, province)}
        disabled={!isProvinceSelected}
        title="City"
        placeholder={
          province?.value
            ? "Search and select city..."
            : "Select province first"
        }
        variant="horizontal"
      />

      <TextFieldInput
        name="role_data.address"
        control={control}
        title="Address"
        placeholder="Enter complete street address"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.postal_code"
        control={control}
        title="Postal Code"
        placeholder="e.g. 12345"
        variant="horizontal"
      />
    </div>
  );
};
