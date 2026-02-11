import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";

const UserActivity = () => {
  const InfoRow = ({ label, value, isStatus }) => (
    <Box className="flex justify-between items-center py-3">
      <Typography
        sx={{ fontWeight: 500 }}
        className=" font-semibold text-sm capitalize tracking-tight">
        {label}
      </Typography>
      <Typography
        className={`text-sm font-medium capitalize ${
          isStatus == "active" ? "text-green-600 font-bold" : "text-slate-400"
        }`}>
        {value || "-"}
      </Typography>
    </Box>
  );

  const DescriptionSection = ({ title, desc }) => (
    <>
      <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
      <Box className="bg-[#F2F2F7] py-4 px-2">{desc}</Box>
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="contained"
          sx={{
            background: "white",
            color: "#E42D5D",
          }}>
          <ArrowBackOutlined
            sx={{
              fontSize: 20,
              border: "2.25px solid transparent",
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
            }}
            className="font-bold bg-inherit capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            Back{" "}
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
          subtitle="Activity detail from log information"
          className="grid grid-cols-2 gap-6">
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
