import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Controller } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typography/TextLabel";

// --- SHARED STYLES ---
const selectStyles = {
  borderRadius: "12px",
  backgroundColor: "#fff",
  fontSize: "0.875rem",
  color: "#475569",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cb0c9f",
    borderWidth: "2px",
  },
  "& .MuiSelect-select": { padding: "10px 16px" },
};

// --- BASE PRESENTATIONAL COMPONENT ---
const SelectBase = ({ variant, error, helperText, children, ...props }) => (
  <Box
    className={
      variant === "horizontal"
        ? `grid grid-cols-3 ${error ? "items-baseline" : "items-center"} gap-1`
        : "flex flex-col gap-1"
    }>
    {props?.title && (
      <TextLabel>{props?.title}</TextLabel>
      // <Typography

      //   className={`ml-1 text-xs font-bold ${error ? "text-red-500" : ""}`}>
      //   {label}
      // </Typography>
    )}
    <FormControl
      fullWidth
      error={error}
      className={variant === "horizontal" ? "col-span-2" : ""}>
      <Select
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        sx={selectStyles}
        {...props}>
        {children}
      </Select>
      {helperText && (
        <FormHelperText className="ml-2">{helperText}</FormHelperText>
      )}
    </FormControl>
  </Box>
);

// --- 1. CONTROLLED SELECT (For manual state) ---
export const ControlledSelect = ({ options, placeholder, ...props }) => (
  <SelectBase {...props}>
    {placeholder && (
      <MenuItem value="" disabled>
        <span>{placeholder}</span>
      </MenuItem>
    )}
    {options.map((opt) => (
      <MenuItem key={opt.value} value={opt.value}>
        {opt.label}
      </MenuItem>
    ))}
  </SelectBase>
);

// --- 2. UNCONTROLLED SELECT (For React Hook Form) ---
export const RHFSelect = ({
  name,
  control,
  options,
  placeholder,
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <SelectBase
        {...field}
        {...props}
        error={!!error}
        helperText={error?.message}>
        {placeholder && (
          <MenuItem value="" disabled>
            <span>{placeholder}</span>
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </SelectBase>
    )}
  />
);
