import { Box } from "@mui/material";

export const CardDefault = ({ children }) => {
  return (
    <Box className="bg-white rounded-2xl p-6 shadow-soft-xl border-0 overflow-hidden">
      {children}
    </Box>
  );
};
