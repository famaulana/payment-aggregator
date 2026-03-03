import React from "react";
import { Box } from "@mui/material";

const ErrorCloseIcon = ({ size = 200, ...props }) => {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <defs>
        {/* Define the linear gradient based on your image colors */}
        <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E42D5D" /> {/* Lighter Red */}
          <stop offset="100%" stopColor="#973D3D" /> {/* Deeper Crimson */}
        </linearGradient>
      </defs>

      {/* Circle using the gradient defined above */}
      <circle cx="100" cy="100" r="100" fill="url(#errorGradient)" />

      {/* White 'X' */}
      <path
        d="M65 65L135 135M135 65L65 135"
        stroke="white"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
};

export default ErrorCloseIcon;
