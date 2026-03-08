import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { SuccessIcon } from "@/components/atoms/icons/SuccessIcon";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { GradientPagination } from "@/components/molecules/pagination/GradientPagination";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { TableDefault } from "@/components/molecules/tables/TableDefault";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";
import { useGetActivities } from "@/features/logs/hooks/getActivities";
import { useGetUserDetail } from "@/features/users/hooks/useGetUserDetail";
import {
  PAYMENT_GATEWAY_OPTIONS,
  STATUS_LOGS_OPTIONS,
} from "@/utils/constants";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const dummy = [
  {
    date: "10 january 2026, 18:00",
    id: "123456xxxxxxx1",
    merchant: "Julian Store",
    payment_method: "QRIS",
    payment_gateway: "STI",
    amount: "Rp. 500.000",
    mdr_fee: "0.7%",
    status: "Pending",
  },
  {
    date: "10 january 2026, 18:00",
    id: "123456xxxxxxx2",
    merchant: "Julian Store",
    payment_method: "Virtual Account",
    payment_gateway: "Xendit",
    amount: "Rp. 500.000",
    mdr_fee: "Rp. 2.500",
    status: "Success",
  },
  {
    date: "10 january 2026, 18:00",
    id: "123456xxxxxxx3",
    merchant: "Julian Store",
    payment_method: "Bank Transfer",
    payment_gateway: "Bayarind",
    amount: "Rp. 500.000",
    mdr_fee: "Rp. 2.500",
    status: "Success",
  },
  {
    date: "10 january 2026, 18:00",
    id: "123456xxxxxxx4",
    merchant: "Julian Store",
    payment_method: "Credit/Debit Card",
    payment_gateway: "CashUp",
    amount: "Rp. 500.000",
    mdr_fee: "Rp. 2.500",
    status: "Success",
  },
  {
    date: "10 january 2026, 18:00",
    id: "123456xxxxxxx5",
    merchant: "Julian Store",
    payment_method: "E-Wallet",
    payment_gateway: "CRING",
    amount: "Rp. 500.000",
    mdr_fee: "Rp. 2.500",
    status: "Failed",
  },
];

const dummyTop = [
  {
    payment_method: "QRIS",
    percentage: "50%",
    amount: "Rp. 300.000.000",
  },
  {
    payment_method: "Virtual Account",
    percentage: "20%",
    amount: "Rp. 100.000.000",
  },
  {
    payment_method: "E-Wallet",
    percentage: "20%",
    amount: "Rp. 100.000.000",
  },
  {
    payment_method: "Bank Transfer",
    percentage: "5%",
    amount: "Rp. 50.000.000",
  },
  {
    payment_method: "Credit/Debit Card",
    percentage: "5%",
    amount: "Rp. 50.000.000",
  },
];

const InfoRow = ({ label, value, isStatus }) => (
  <Box className="flex justify-between items-center py-3">
    <Typography
      sx={{ fontWeight: 500 }}
      className=" font-semibold text-sm capitalize tracking-tight">
      {label}
    </Typography>
    <Typography
      className={`text-sm font-medium ${label == "Email" ? "" : "capitalize"} ${
        isStatus == "active" ? "text-green-600 font-bold" : "text-slate-400"
      }`}>
      {value || "-"}
    </Typography>
  </Box>
);

const columnsTop5 = [
  {
    id: "payment_method",
    label: "Payment Method",
  },
  {
    id: "percentage",
    label: "Total Percentage",
  },
  {
    id: "amount",
    label: "Total Amount",
  },
];

const MerchantDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [payload, setPayload] = useState({});

  const { data: detailData } = useGetUserDetail(id);
  const { data: listActivity } = useGetActivities({
    ...payload,
    user_id: Number(id),
  });

  const onDetail = (id) => {
    console.log(id);
  };

  const onBack = () => {
    router.back();
  };

  const columns = [
    {
      id: "date",
      label: "Date & Time",
    },
    {
      id: "id",
      label: "Transaction ID",
    },
    {
      id: "merchant",
      label: "Merchant",
    },
    {
      id: "payment_method",
      label: "Payment Method",
    },
    {
      id: "payment_gateway",
      label: "Payment Gateway",
    },
    {
      id: "amount",
      label: "Transaction Amount",
    },
    {
      id: "mdr_fee",
      label: "MDR Fee",
    },
    {
      id: "status",
      label: "Status",
    },
    {
      id: "action",
      label: "More Action",
      maxWidth: 50,
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DefaultButton
            onClick={onDetail.bind(this, row.id)}
            sx={{ marginTop: 0 }}>
            View Details
          </DefaultButton>
        </Box>
      ),
    },
  ];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect
        onChange={handleChangeInput}
        options={PAYMENT_GATEWAY_OPTIONS}
        value={payload?.status ?? ""}
      />
      <ControlledSelect
        onChange={handleChangeInput}
        options={PAYMENT_GATEWAY_OPTIONS}
        value={payload?.status ?? ""}
      />
      <ControlledSelect
        onChange={handleChangeInput}
        options={STATUS_LOGS_OPTIONS}
        value={payload?.status ?? ""}
      />
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="contained"
          onClick={onBack}
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <UserInfoCard
          title="Merchant Information"
          subtitle="All Detail information about this merchant">
          <InfoRow label="Merchant ID" value={detailData?.data.id} />
          <InfoRow label="Merchant Name" value={detailData?.data.full_name} />
          <InfoRow label="Region Merchant" value={detailData?.data.full_name} />
          <InfoRow
            label="Active Payment Method"
            value={detailData?.data.full_name}
          />
          <InfoRow
            label="Status"
            value={detailData?.data.status}
            isStatus={detailData?.data.status}
          />
          <InfoRow
            label="Registration Date"
            value={detailData?.data.created_at}
          />
        </UserInfoCard>
        <UserInfoCard
          title={`Top 5 Payment Method from ${detailData?.data.full_name}`}
          subtitle="Payment Method usage from this merchant">
          <TableDefault columns={columnsTop5} data={dummyTop} />
        </UserInfoCard>
      </div>
      <div className="mt-4">
        <TableCardWithFilter
          title={`Transaction From ${detailData?.data.full_name ?? "Person"}`}
          renderFilter={() => <FilterComponent />}
          columns={columns}
          data={dummy}
          // pagination={listActivity?.pagination ?? null}
        />
      </div>
      <div className="flex justify-end mt-2 cols">
        <GradientPagination totalPages={2} />
      </div>
    </>
  );
};

export default MerchantDetailsPage;
