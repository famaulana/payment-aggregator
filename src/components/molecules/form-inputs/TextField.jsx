import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { TextLabel } from "@/components/atoms/typography/TextLabel";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

export const TextFieldInput = ({
  name,
  control,
  variant = "vertical",
  ...props
}) =>
  variant == "horizontal" ? (
    <div className="grid grid-cols-3">
      <div className="flex items-center">
        <TextLabel>{props?.title}</TextLabel>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <StyledTextField
            className="col-span-2 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
            placeholder={props?.placeholder}
            {...field}
            {...props}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </div>
  ) : (
    <>
      <TextLabel>{props?.title}</TextLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <StyledTextField
            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
            placeholder={props?.placeholder}
            {...field}
            {...props}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </>
  );
