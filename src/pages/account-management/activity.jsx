import React from "react";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";

const InfoRow = ({ label, value, isStatus }) => (
  <Box className="flex justify-between items-center py-3">
    <Typography
      sx={{ fontWeight: 500 }}
      className="font-semibold text-sm capitalize tracking-tight">
      {label}
    </Typography>
    <Typography
      className={`text-sm font-medium ${label != "Email" ? "capitalize" : ""} ${
        isStatus === "active" ? "text-green-600 font-bold" : "text-slate-400"
      }`}>
      {value || "-"}
    </Typography>
  </Box>
);

const DescriptionSection = ({ title, desc }) => (
  <Box className="mb-4">
    {" "}
    {/* Added margin for spacing */}
    <Typography sx={{ fontWeight: 600, mb: 1, color: "#344767" }}>
      {title}
    </Typography>
    <Box className="bg-[#F2F2F7] py-4 px-3 rounded-xl text-sm text-slate-600 leading-relaxed">
      {desc}
    </Box>
  </Box>
);

const UserActivity = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        {/* Improved Button to match your Gradient Back Button request */}
        <Button
          onClick={() => window.history.back()}
          variant="contained"
          sx={{
            background: "white",
            color: "#E42D5D",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            borderRadius: "12px",
            padding: "8px 16px",
            "&:hover": { background: "#fcfcfc" },
          }}>
          <ArrowBackOutlined sx={{ fontSize: 20, mr: 1 }} />
          <Typography
            sx={{ fontWeight: 600 }}
            className="font-bold capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            Back
          </Typography>
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <UserInfoCard
          title="Log Information"
          subtitle="All detail about log information">
          <InfoRow label="Log ID" value="Log-001" />
          <InfoRow label="User ID" value="User-001" />
          <InfoRow label="Name" value="Julian Pratama" />
          <InfoRow label="Email" value="julianpratama02@gmail.com" />
          <InfoRow label="Role" value="Headquarter" />
          <InfoRow label="Activity Type" value="Login" />
          <InfoRow label="IP Address" value="192.176.12.2" />
          <InfoRow label="Activity Date" value="10 January 2026, 18:00" />
        </UserInfoCard>

        <UserInfoCard
          title="Activity Detail"
          subtitle="Activity detail from log information">
          {/* Note: Removed 'grid grid-cols-2' from UserInfoCard if it causes layout issues */}
          <DescriptionSection
            title="User Action Summary"
            desc="User-001 with role Headquarter performed Login activity from IP address 192.168.1.207 at Feb 1, 2026, 10:03:06 PM."
          />
          <DescriptionSection
            title="Additional Context"
            desc="User performed action successfully"
          />
        </UserInfoCard>
      </div>
    </>
  );
};

export default UserActivity;
