import React from "react";
import { Card, Box, Typography } from "@mui/material";

const UserInfoCard = ({ title = "title", subtitle, children, ...props }) => {
  return (
    <Card
      elevation={0}
      className="rounded-2xl shadow-soft-xl p-6 bg-white border border-gray-100 w-full h-auto">
      {/* Header Section */}
      <Box className="mb-4">
        <Typography
          variant="h6"
          className="text-[#344767] font-bold text-lg mb-1">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" className="text-slate-400">
            {subtitle}
          </Typography>
        ) : (
          ""
        )}
      </Box>

      {/* Content Section */}
      <Box className="flex flex-col" {...props}>
        {children}
      </Box>
    </Card>
  );
};

export default UserInfoCard;
