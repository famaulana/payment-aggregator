import React, { useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCheckboxSlider = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 26,
  padding: 0,
  marginRight: "4px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transition: "transform 300ms, color 300ms", // Use standard CSS strings for safety
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#3A416FF2",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    // Safely access theme with a fallback to avoid '_names' null error
    transition: theme?.transitions?.create
      ? theme.transitions.create(["background-color"], { duration: 500 })
      : "background-color 500ms ease-in-out",
  },
}));

export const SliderSwitch = ({ status, label }) => {
  const [checked, setChecked] = useState(status);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="grid grid-flow-col gap-2">
      <StyledCheckboxSlider
        checked={checked}
        onChange={handleChange}
        disabled={isDisabled}
        inputProps={{ "aria-label": "controlled" }}
      />
      {label ? (
        <p className="font-normal text-sm">
          {checked ? "Toggle ON" : "Toggle OFF"}
        </p>
      ) : null}
    </div>
  );
};
