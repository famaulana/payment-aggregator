import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CustomizedPrimaryButton = styled(Button)(({ theme }) => ({
  // Display & Sizing
  display: "inline-block",
  width: "100%",
  padding: "12px 24px", // px-6 py-3
  marginTop: "24px", // mt-6
  marginBottom: 0, // mb-0

  // Typography
  fontWeight: 700, // font-bold
  textAlign: "center",
  color: "#fff",
  textTransform: "uppercase",
  fontSize: "0.75rem", // text-xs
  letterSpacing: "0.025em",

  // Background & Border
  background: "linear-gradient(310deg, #473D97 0%, #E42D5D 100%)", // bg-linear-to-tl
  border: 0,
  borderRadius: "8px", // rounded-lg
  cursor: "pointer",

  // Transitions & Shadows
  transition: "all 0.15s ease-in",
  boxShadow: "0 4px 7px -1px rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.07)", // shadow-soft-md

  // Hover State
  "&:hover": {
    transform: "scale(1.02)", // hover:scale-102
    backgroundColor: "transparent", // Prevents MUI default gray overlay
    boxShadow:
      "0 3px 5px -1px rgba(0,0,0,0.09), 0 2px 3px -1px rgba(0,0,0,0.07)",
    // Maintain gradient on hover
    background: "linear-gradient(310deg, #473D97 0%, #E42D5D 100%)",
    opacity: 0.9,
  },

  // Active/Click State
  "&:active": {
    opacity: 0.85, // active:opacity-85
    transform: "scale(1)",
  },

  // Fix for MUI Ripple to ensure it doesn't look gray
  "& .MuiTouchRipple-root": {
    color: "rgba(255, 255, 255, 0.3)",
  },
}));

const CustomizedDangerButton = styled(Button)(({ theme }) => ({
  // Display & Sizing
  display: "inline-block",
  width: "100%",
  padding: "12px 24px", // px-6 py-3
  marginTop: "18px", // mt-6
  marginBottom: 0, // mb-0

  // Typography
  fontWeight: 700, // font-bold
  textAlign: "center",
  color: "#fff",
  textTransform: "uppercase",
  fontSize: "0.75rem", // text-xs
  letterSpacing: "0.025em",

  // Background & Border
  background: "linear-gradient(310deg, #973D3D 0%, #E42D5D 100%)", // bg-linear-to-tl
  border: 0,
  borderRadius: "8px", // rounded-lg
  cursor: "pointer",

  // Transitions & Shadows
  transition: "all 0.15s ease-in",
  boxShadow: "0 4px 7px -1px rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.07)", // shadow-soft-md

  // Hover State
  "&:hover": {
    transform: "scale(1.02)", // hover:scale-102
    backgroundColor: "transparent", // Prevents MUI default gray overlay
    boxShadow:
      "0 3px 5px -1px rgba(0,0,0,0.09), 0 2px 3px -1px rgba(0,0,0,0.07)",
    // Maintain gradient on hover
    background: "linear-gradient(310deg, #973D3D 0%, #E42D5D 100%)",
    opacity: 0.9,
  },

  // Active/Click State
  "&:active": {
    opacity: 0.85, // active:opacity-85
    transform: "scale(1)",
  },

  // Fix for MUI Ripple to ensure it doesn't look gray
  "& .MuiTouchRipple-root": {
    color: "rgba(255, 255, 255, 0.3)",
  },
}));

const CustomizedSuccessButton = styled(Button)(({ theme }) => ({
  // Display & Sizing
  display: "inline-block",
  width: "100%",
  padding: "12px 24px", // px-6 py-3
  marginTop: "18px", // mt-6
  marginBottom: 0, // mb-0

  // Typography
  fontWeight: 700, // font-bold
  textAlign: "center",
  color: "#fff",
  textTransform: "uppercase",
  fontSize: "0.75rem", // text-xs
  letterSpacing: "0.025em",

  // Background & Border
  background: "linear-gradient(310deg, #3D9743 0%, #005607 100%)", // bg-linear-to-tl
  border: 0,
  borderRadius: "8px", // rounded-lg
  cursor: "pointer",

  // Transitions & Shadows
  transition: "all 0.15s ease-in",
  boxShadow: "0 4px 7px -1px rgba(0,0,0,0.11), 0 2px 4px -1px rgba(0,0,0,0.07)", // shadow-soft-md

  // Hover State
  "&:hover": {
    transform: "scale(1.02)", // hover:scale-102
    backgroundColor: "transparent", // Prevents MUI default gray overlay
    boxShadow:
      "0 3px 5px -1px rgba(0,0,0,0.09), 0 2px 3px -1px rgba(0,0,0,0.07)",
    // Maintain gradient on hover
    background: "linear-gradient(310deg, #3D9743 0%, #005607 100%)",
    opacity: 0.9,
  },

  // Active/Click State
  "&:active": {
    opacity: 0.85, // active:opacity-85
    transform: "scale(1)",
  },

  // Fix for MUI Ripple to ensure it doesn't look gray
  "& .MuiTouchRipple-root": {
    color: "rgba(255, 255, 255, 0.3)",
  },
}));

export const DefaultButton = ({
  colorType = "primary",
  children,
  ...props
}) => {
  if (colorType == "danger") {
    return (
      <CustomizedDangerButton variant="contained" {...props}>
        {children}
      </CustomizedDangerButton>
    );
  } else if (colorType == "success") {
    return (
      <CustomizedSuccessButton variant="contained" {...props}>
        {children}
      </CustomizedSuccessButton>
    );
  } else {
    return (
      <CustomizedPrimaryButton variant="contained" {...props}>
        {children}
      </CustomizedPrimaryButton>
    );
  }
};
