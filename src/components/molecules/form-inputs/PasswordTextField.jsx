import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typography/TextLabel";

export const PasswordTextField = ({ name, control, label, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <TextLabel>{props?.title}</TextLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            {...props}
            label={label}
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!error}
            helperText={error?.message}
            variant="outlined"
            // Customizing the "Soft UI" look
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                className: "rounded-lg bg-white",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#E9E9EA" },
                "&:hover fieldset": { borderColor: "#473D97" },
                "&.Mui-focused fieldset": { borderColor: "#473D97" },
              },
              ...props.sx,
            }}
          />
        )}
      />
    </>
  );
};
