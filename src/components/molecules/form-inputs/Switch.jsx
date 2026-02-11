import React, { useState, useEffect } from "react";
import { Switch, Box } from "@mui/material"; // Added Box for layout
import { styled } from "@mui/material/styles";
import { TextLabel } from "@/components/atoms/typography/TextLabel";

const StyledCheckboxSlider = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 26,
  padding: 0,
  marginRight: "4px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transition: "transform 300ms, color 300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)", // Slightly increased for the 46px width
      color: "#fff",
      "& + .MuiSwitch-track": {
        background: "linear-gradient(310deg, #3D9743 0%, #005607 100%)",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: "background-color 500ms ease-in-out",
  },
}));

// Added onChange and isDisabled to props
export const SliderSwitch = ({
  status = false,
  label,
  onChange,
  isDisabled = false,
}) => {
  // Sync internal state with prop if it changes externally
  const [checked, setChecked] = useState(status);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  const handleChange = (event) => {
    const val = event.target.checked;
    setChecked(val);

    // Send the status back to the parent component
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className="grid grid-cols-3">
      <TextLabel>{label?.title}</TextLabel>
      <div className="flex items-center gap-2 col-span-2">
        <p className="text-sm">{label?.off ?? "ON"}</p>
        <StyledCheckboxSlider
          checked={checked}
          onChange={handleChange}
          disabled={isDisabled}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p className="text-sm">{label?.on ?? "ON"}</p>
      </div>
    </div>
  );
};
