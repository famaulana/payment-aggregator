"use client";

import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  debounce,
} from "@mui/material";
import { Controller } from "react-hook-form";
// import debounce from "lodash/debounce";
import { TextLabel } from "@/components/atoms/typography/TextLabel";

/**
 * BASE COMPONENT: The "Dumb" UI
 * Use this for Non-RHF / No-Label scenarios
 */
export const AsyncSelectBase = ({
  value,
  onChange,
  fetchFn,
  placeholder = "Search...",
  error,
  helperText,
  variant = "vertical", // "vertical" | "horizontal"
  inputRef,
  disabled,
  ...props
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = useMemo(
    () =>
      debounce(async (inputValue) => {
        if (!inputValue) return;
        setLoading(true);
        try {
          const data = await fetchFn(inputValue);
          setOptions(data || []);
        } catch (err) {
          setOptions([]);
        } finally {
          setLoading(false);
        }
      }, 500),
    [fetchFn],
  );

  const autocompleteContent = (
    <Autocomplete
      {...props}
      filterOptions={(x) => x}
      value={value || null}
      onChange={(event, newValue) => onChange(newValue)}
      onInputChange={(event, newInputValue) => fetchOptions(newInputValue)}
      options={options}
      loading={loading}
      disabled={disabled}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      getOptionLabel={(option) => option.label || ""}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );

  // --- LAYOUT RENDERING ---

  // Horizontal Variant (Usually for RHF Forms)
  if (variant === "horizontal") {
    return (
      <Box
        className="flex flex-col md:grid md:grid-cols-3"
        sx={{ width: "100%" }}>
        {props?.title && <TextLabel>{props?.title}</TextLabel>}
        <Box className="md:col-span-2">{autocompleteContent}</Box>
      </Box>
    );
  }

  // Vertical Variant (Standard or No-Label)
  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      {props?.title && <TextLabel>{props?.title}</TextLabel>}
      {autocompleteContent}
    </Box>
  );
};

/**
 * RHF WRAPPER: The "Smart" Component
 * Use this inside your FormBuilder or any React Hook Form
 */
export const RHFAsyncSelect = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <AsyncSelectBase
          {...props}
          value={value}
          onChange={onChange}
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
