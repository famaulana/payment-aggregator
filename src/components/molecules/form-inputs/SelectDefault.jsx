import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const FormSelect = ({
  name,
  control,
  label,
  options = [],
  defaultValue = "",
  rules = {},
  ...props
}) => {
  const labelId = `${name}-label`;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          error={!!error}
          className="mt-4"
          variant="outlined">
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...field}
            labelId={labelId}
            label={label}
            {...props}
            // Use standard MUI styles, but we can override with Tailwind
            className="rounded-lg bg-white">
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {/* Show the error message if validation fails */}
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
