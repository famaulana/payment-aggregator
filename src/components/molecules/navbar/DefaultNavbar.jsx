import React from "react";
import { Tabs, Tab, styled } from "@mui/material";

const StyledTabs = styled(Tabs)({
  borderBottom: "none",
  "& .MuiTabs-scroller": {
    // Ensure no hidden borders are lingering in the scroller
    borderBottom: "none",
  },
  "& .MuiTabs-indicator": {
    height: 3,
    borderRadius: "3px 3px 0 0",
    // Exact gradient from your reference image
    background: "linear-gradient(90deg, #be185d 0%, #6b21a8 100%)",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none", // Keeps natural casing
  fontWeight: 600,
  fontSize: "0.875rem",
  marginRight: "20px",
  color: "#64748b", // slate-500 for inactive
  "&.Mui-selected": {
    color: "#0f172a", // slate-900 for active
  },
  "&:hover": {
    color: "#334155", // slate-700 on hover
    opacity: 1,
  },
});

const DefaultNavbar = ({ value, onChange, navItems = [] }) => {
  return (
    <StyledTabs value={value} onChange={onChange} aria-label="activity tabs">
      {navItems.length > 0 &&
        navItems.map((item) => <StyledTab label={item.label} />)}
    </StyledTabs>
  );
};

export default DefaultNavbar;
