import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useDistricts } from "@/features/location/hooks/useDistricts";
import { useProvinces } from "@/features/location/hooks/useProvinces";
import { useSubDistricts } from "@/features/location/hooks/useSubDistricts";

export const SubFormHeadQuarter = ({ methods, province, city, district }) => {
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
        name="role_data.head_quarter_code"
        control={control}
        title="Head Quarter Code"
        variant="horizontal"
        placeholder="e.g., HQ-JAKARTA-01"
      />
      <TextFieldInput
        name="role_data.head_quarter_name"
        control={control}
        title="Head Quarter Name"
        variant="horizontal"
        placeholder="Enter head quarter official name"
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
        placeholder="e.g., Jl. Jendral Sudirman No. 123"
        multiline // Optional: address usually needs more space
        rows={2}
      />
      <TextFieldInput
        name="role_data.postal_code"
        control={control}
        title="Postal Code"
        variant="horizontal"
        placeholder="e.g., 12345"
      />
    </div>
  );
};
