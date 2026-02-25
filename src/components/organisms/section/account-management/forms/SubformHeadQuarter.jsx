import { RHFAsyncSelect } from "@/components/molecules/form-inputs/SelectAsync";
import { TextFieldInput } from "@/components/molecules/form-inputs/TextField";
import { useCities } from "@/features/location/hooks/useCities";
import { useDistricts } from "@/features/location/hooks/useDistricts";
import { useProvinces } from "@/features/location/hooks/useProvinces";
import { useSubDistricts } from "@/features/location/hooks/useSubDistricts";

export const SubFormClient = ({ methods }) => {
  const { loadOptions: loadProvinceOptions } = useProvinces();
  const { loadOptions: loadCityOptions } = useCities();
  const { loadOptions: loadDistrictOptions } = useDistricts();
  const { loadOptions: loadSubDistrictOptions } = useSubDistricts();

  const { watch, control } = methods;

  const province = watch("role_data.province_id");
  const city = watch("role_data.city_id");
  const district = watch("role_data.district_id");

  return (
    <div className="flex flex-col space-y-4">
      <TextFieldInput
        name="role_data.head_quarter_code"
        control={control}
        title="Head Quarter Code"
        variant="horizontal"
      />
      <TextFieldInput
        name="role_data.head_quarter_name"
        control={control}
        title="Head Quarter Name"
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
      <RHFAsyncSelect
        name="role_data.district_id"
        control={control}
        fetchFn={loadDistrictOptions}
        disabled={!city}
        title="District"
        variant="horizontal"
      />
      <RHFAsyncSelect
        name="role_data.sub_district_id"
        control={control}
        fetchFn={loadSubDistrictOptions}
        disabled={!district}
        title="Sub District"
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
