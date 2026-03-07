import CopyButton from "@/components/atoms/button/CopyButton";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { SuccessIcon } from "@/components/atoms/icons/SuccessIcon";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";
import { useGetUserDetail } from "@/features/users/hooks/useGetUserDetail";
import { ROLE_OPTIONS, STATUS_LOGS_OPTIONS } from "@/utils/constants";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const data = {
  transaction_id: "TXN-1000",
  ref_id: "User-001",
  merchant: "Julian Store",
  payment_method: "QRIS",
  payment_gateway: "STI",
  pg_ref_id: "PG-001",
  amount: "Rp. 500.000",
  pg_fee: "0.5%",
  our_fee: "0.2%",
  total_mdr: "0.7%",
  final_amount: "Rp. 496.500",
  status: "pending",
  date: "10 January 2016, 18:00",
};

const colorStatus = (status) => {
  switch (status) {
    case "success":
      return "text-[#199700]";
    case "pending":
      return "text-[#BC9000]";
    case "failed":
      return "text-[#FF5555]";
    default:
      return null;
  }
};

const TransactionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { data: detailData } = useGetUserDetail(id);

  const handleBack = () => {
    router.back();
  };

  const InfoRow = ({ label, value, isStatus, hasCopy, ...props }) => {
    const colorText = colorStatus(isStatus);
    return (
      <Box className="flex justify-between items-center py-7" {...props}>
        <Typography
          sx={{ fontWeight: 500 }}
          className=" font-semibold text-sm capitalize tracking-tight">
          {label}
        </Typography>
        <div className="flex">
          <Typography className={`text-sm font-medium capitalize ${colorText}`}>
            {value || "-"}
          </Typography>
          {hasCopy && value && <CopyButton text={value} />}
        </div>
      </Box>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="contained"
          sx={{
            background: "white",
            color: "#E42D5D",
          }}
          onClick={handleBack}>
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
        <Button
          variant="contained"
          sx={{
            background: "#00941E",
            color: "white",
          }}>
          <Typography
            sx={{
              fontWeight: 600,
            }}
            className="font-bold">
            Export to Excel{" "}
          </Typography>
        </Button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        <UserInfoCard
          title="Transaction Information"
          subtitle="All detail information about this transaction">
          <InfoRow label="Transaction ID" value={data.transaction_id} />
          <InfoRow label="Ref ID" value={data.ref_id} />
          <InfoRow label="Merchant" value={data.merchant} />
          <InfoRow label="Payment Method" value={data.payment_method} />
          <InfoRow label="Payment Gateway" value={data.payment_gateway} />
          <InfoRow label="PG Ref ID" value={data.pg_ref_id} hasCopy />
          <InfoRow label="Status" value={data.status} isStatus={data.status} />
          <InfoRow label="Date & Time" value={data.date} />
        </UserInfoCard>
        <UserInfoCard
          title="Transaction Amount"
          subtitle="Amount breakdown on this transaction"
          className="grid grid-cols-1">
          <InfoRow label="Transaction Amount" value={data.amount} />
          <InfoRow label="PG Fee" value={data.pg_fee} />
          <InfoRow
            label="Our Fee"
            value={data.our_fee}
            sx={{
              borderBottom: "solid 1px #E7E7E7",
            }}
          />
          <InfoRow
            label="Total MDR"
            value={data.total_mdr}
            sx={{
              borderBottom: "solid 1px #E7E7E7",
            }}
          />
          <InfoRow label="Final Amount" value={data.final_amount} />
        </UserInfoCard>
      </div>
    </>
  );
};

export default TransactionDetail;
