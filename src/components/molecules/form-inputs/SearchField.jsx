import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = ({
  value,
  onChange,
  placeholder = "Search Anything Here",
  ...props
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
          borderRadius: "12px",
          fontSize: "0.875rem",
          "& fieldset": { borderColor: "#e2e8f0" }, // slate-200
          "&:hover fieldset": { borderColor: "#cbd5e1" }, // slate-300
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#94a3b8", fontSize: "20px" }} />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default SearchField;
