import React from "react";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";

const logData = {
  logId: "EXT-1000",
  timestamp: "2026-01-10 18:00:39",
  source: "Payment Gateway",
  direction: "Inbound",
  event: "Payment Request",
  status: "Success",
  references: ["REF-10000", "TXN-1000"],
  response: { code: 200, message: "Transaction successed" },
};

const InfoRow = ({ label, value, isStatus }) => (
  <Box className="flex justify-between items-center py-3">
    <Typography
      sx={{ fontWeight: 500 }}
      className="font-semibold text-sm capitalize tracking-tight">
      {label}
    </Typography>
    <Typography
      className={`text-sm font-medium capitalize ${
        isStatus === "active" ? "text-green-600 font-bold" : "text-slate-400"
      }`}>
      {value || "-"}
    </Typography>
  </Box>
);

const keys = Object.keys(logData);

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        <UserInfoCard
          title="Log Information"
          subtitle="All detail about log information">
          <InfoRow label="Log ID" value="Log-001" />
          <InfoRow label="Source System" value="User-001" />
          <InfoRow label="Activity Type" value="Julian Pratama" />
          <InfoRow label="Event Type" value="julianpratama02@gmail.com" />
          <InfoRow label="Related Ref ID" value="Headquarter" />
          <InfoRow label="Status" value="Login" />
          <InfoRow label="Activity Date" value="10 January 2026, 18:00" />
        </UserInfoCard>

        <UserInfoCard title="Payload Review">
          {/* Note: Removed 'grid grid-cols-2' from UserInfoCard if it causes layout issues */}
          <Box className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <Typography className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">
              System Response
            </Typography>
            <Box className="flex items-center gap-2">
              <Typography className="text-green-600 font-mono font-bold text-sm">
                {logData.response.code}
              </Typography>
              <Typography className="text-slate-600 text-sm italic">
                {`"${logData.response.message}"`}
              </Typography>
            </Box>
            <Box>
              {"{"} <br />
              <Box className="pl-4">
                {keys.map((item, index) => (
                  <Box
                    key={`item${item}-${index}`}
                    className="flex items-center gap-2">
                    <Typography className="font-mono font-bold text-sm">
                      {`"${item}"`} :
                    </Typography>
                    <Typography className="text-slate-600 text-sm italic">
                      {typeof logData[item] == "object"
                        ? JSON.stringify(logData[item])
                        : logData[item]}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {"}"} <br />
            </Box>
          </Box>
        </UserInfoCard>
      </div>
    </>
  );
};

export default UserActivity;
