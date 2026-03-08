import React from "react";
import { Controller } from "react-hook-form";
import { Box, Chip, FormHelperText, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";

// --- BASE STYLED CHIP (Mirrors your Select/Input styling) ---
const StyledChip = ({ label, selected, onClick }) => (
  <Chip
    label={label}
    onClick={onClick}
    // Icon matches the clean checkmark style
    icon={
      selected ? (
        <Done sx={{ fontSize: "14px !important", color: "inherit" }} />
      ) : null
    }
    sx={{
      height: "40px", // Matches standard input height
      px: 1,
      borderRadius: "8px", // Matches your Select/Input rounding
      fontSize: "0.8125rem",
      fontWeight: selected ? 600 : 500,
      transition: "all 0.2s ease-in-out",

      // Default State: Soft border matching your text fields
      backgroundColor: selected ? "transparent" : "#ffffff",
      color: selected ? "#fff" : "#7b809a",
      border: "1px solid",
      borderColor: selected ? "transparent" : "#d2d6da",

      // Active State: Brand Gradient
      backgroundImage: selected
        ? "linear-gradient(310deg, #713385 0%, #C23A73 100%)"
        : "none",
      boxShadow: selected
        ? "0 4px 7px -1px rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.07)"
        : "none",

      "& .MuiChip-icon": {
        color: "inherit",
        marginLeft: "4px",
      },
      "& .MuiChip-label": {
        paddingLeft: selected ? "8px" : "12px",
        paddingRight: "12px",
      },
      "&:hover": {
        backgroundColor: selected ? "none" : "#f8f9fa",
        borderColor: selected ? "transparent" : "#344767",
        opacity: selected ? 0.9 : 1,
      },
    }}
  />
);

// --- UNIVERSAL CHIP GROUP ---
export const AppChipGroup = ({
  name,
  control,
  options = [],
  label,
  multiple = false,
  value: manualValue,
  onChange: manualOnChange,
}) => {
  const handleSelection = (currentValue, updater, clickedValue) => {
    if (multiple) {
      const arr = Array.isArray(currentValue) ? currentValue : [];
      const newValue = arr.includes(clickedValue)
        ? arr.filter((v) => v !== clickedValue)
        : [...arr, clickedValue];
      updater(newValue);
    } else {
      updater(clickedValue);
    }
  };

  const renderContent = (currentValue, updater) => (
    <Box>
      {label && (
        <Typography
          variant="caption"
          className="text-[#344767] font-bold mb-2 block uppercase tracking-tight"
          sx={{ fontSize: "0.7rem", opacity: 0.8 }}>
          {label}
        </Typography>
      )}
      <Box className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <StyledChip
            key={opt.value}
            label={opt.label}
            selected={
              multiple
                ? (currentValue || []).includes(opt.value)
                : currentValue === opt.value
            }
            onClick={() => handleSelection(currentValue, updater, opt.value)}
          />
        ))}
      </Box>
    </Box>
  );

  if (control && name) {
    return (
      <Box className="mb-4 w-full">
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              {renderContent(value, onChange)}
              {error && (
                <FormHelperText error sx={{ ml: 1, mt: 0.5, fontWeight: 500 }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </Box>
    );
  }

  return (
    <Box className="mb-4 w-full">
      {renderContent(manualValue, manualOnChange)}
    </Box>
  );
};
