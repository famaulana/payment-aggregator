"use client";

import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import debounce from "lodash/debounce";
import { TextLabel } from "@/components/atoms/typography/TextLabel";

/**
 * BASE COMPONENT: The "Dumb" UI
 * Use this for Non-RHF / No-Label scenarios
 */
export const AsyncSelectBase = ({
  label,
  value,
  onChange,
  fetchFn,
  placeholder = "Search...",
  error,
  helperText,
  variant = "vertical", // "vertical" | "horizontal"
  inputRef,
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
      value={value || null}
      onChange={(event, newValue) => onChange(newValue)}
      onInputChange={(event, newInputValue) => fetchOptions(newInputValue)}
      options={options}
      loading={loading}
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
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "center" },
          width: "100%",
          gap: { xs: 1, sm: 2 },
          mb: 2,
        }}>
        {label && <TextLabel>{label}</TextLabel>}
        <Box sx={{ flexGrow: 1 }}>{autocompleteContent}</Box>
      </Box>
    );
  }

  // Vertical Variant (Standard or No-Label)
  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      {label && <TextLabel>{label}</TextLabel>}
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
