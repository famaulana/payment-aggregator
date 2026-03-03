import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useDistricts } from "@/features/location/hooks/useDistricts";
import { useProvinces } from "@/features/location/hooks/useProvinces";
import { useSubDistricts } from "@/features/location/hooks/useSubDistricts";

export const SubFormMerchant = ({ methods, province, city, district }) => {
  const { loadOptions: loadProvinceOptions } = useProvinces();
  const { loadOptions: loadCityOptions } = useCities(true);
  const { loadOptions: loadDistrictOptions } = useDistricts(true);
  const { loadOptions: loadSubDistrictOptions } = useSubDistricts(true);

  const { control } = methods;

  const isProvinceSelected =
    !!province && (typeof province === "object" ? !!province.value : true);
  const isCitySelected =
    !!city && (typeof city === "object" ? !!city.value : true);
  const isDistrictSelected =
    !!district && (typeof district === "object" ? !!district.value : true);

  return (
    <div className="flex flex-col space-y-4">
      <TextFieldInput
        name="role_data.merchant_code"
        control={control}
        title="Merchant Code"
        variant="horizontal"
        placeholder="e.g., MCH-00124"
      />
      <TextFieldInput
        name="role_data.merchant_name"
        control={control}
        title="Merchant Name"
        variant="horizontal"
        placeholder="e.g., Toko Berkah Jaya"
      />
      <RHFAsyncSelect
        name="role_data.province_id"
        control={control}
        fetchFn={loadProvinceOptions}
        title="Province"
        variant="horizontal"
        placeholder="Search and select province..."
      />
      <RHFAsyncSelect
        name="role_data.city_id"
        control={control}
        fetchFn={(inputValue) => loadCityOptions(inputValue, province)}
        disabled={!isProvinceSelected}
        title="City"
        variant="horizontal"
        placeholder={
          isProvinceSelected
            ? "Search and select city..."
            : "Select province first"
        }
      />
      <RHFAsyncSelect
        name="role_data.district_id"
        control={control}
        fetchFn={(inputValue) => loadDistrictOptions(inputValue, city)}
        disabled={!isCitySelected}
        title="District"
        variant="horizontal"
        placeholder={
          isCitySelected ? "Search and select district..." : "Select city first"
        }
      />
      <RHFAsyncSelect
        name="role_data.sub_district_id"
        control={control}
        fetchFn={(inputValue) => loadSubDistrictOptions(inputValue, district)}
        disabled={!isDistrictSelected}
        title="Sub District"
        variant="horizontal"
        placeholder={
          isDistrictSelected
            ? "Search and select sub district..."
            : "Select district first"
        }
      />
      <TextFieldInput
        name="role_data.address"
        control={control}
        title="Address"
        variant="horizontal"
        placeholder="Enter complete street address and building number"
      />
      <TextFieldInput
        name="role_data.postal_code"
        control={control}
        title="Postal Code"
        variant="horizontal"
        placeholder="e.g., 14430"
      />
      <TextFieldInput
        name="role_data.phone"
        control={control}
        title="Phone"
        variant="horizontal"
        placeholder="e.g., 081234567890"
      />
      <TextFieldInput
        name="role_data.merchant_email"
        control={control}
        title="Merchant Email"
        variant="horizontal"
        placeholder="e.g., merchant@email.com"
      />
      <TextFieldInput
        name="role_data.pos_merchant_id"
        control={control}
        title="POS Merchant ID"
        variant="horizontal"
        placeholder="Enter ID from your POS system"
      />
    </div>
  );
};
