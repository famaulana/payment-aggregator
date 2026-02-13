import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const TransactionPage = () => {
  const router = useRouter();

  const [payload, setPayload] = useState({});

  const onDetail = (id) => {
    router.push(
      {
        pathname: `${router.pathname}/detail`,
        query: { id: id },
      },
      undefined,
      { shallow: true },
    );
  };

  const columns = [
    {
      id: "created_at",
      label: "Date & Time",
    },
    {
      id: "id",
      label: "Transaction Id",
    },
    {
      id: "merchant_name",
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
      render: (row) =>
        row.status == "inactive" ? (
          <Typography className="font-bold capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            {row.status}
          </Typography>
        ) : (
          <Typography className="font-bold capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#3D9743] to-[#005607]">
            {row.status}
          </Typography>
        ),
    },
    {
      id: "action",
      label: "More Action",
      width: 200,
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

  const data = [
    {
      created_at: "10 January 2026, 18:00",
      id: "User-001",
      merchant_name: "Merchant A",
      payment_method: "QRIS",
      payment_gateway: "STI",
      amount: "Rp. 500.000",
      mdr_fee: "0.7%",
      status: "Pending",
    },
    {
      created_at: "10 January 2026, 18:00",
      id: "User-001",
      merchant_name: "Merchant A",
      payment_method: "QRIS",
      payment_gateway: "STI",
      amount: "Rp. 500.000",
      mdr_fee: "0.7%",
      status: "Success",
    },
  ];

  const merchantOptions = [
    { label: "All Merchant", value: "" },
    { label: "Client", value: "client" },
    { label: "Headquarter", value: "headquarter" },
    { label: "Merchant", value: "Merchant" },
  ];

  const paymentMethodOptions = [
    { label: "All Payment Method", value: "" },
    { label: "Client", value: "client" },
    { label: "Headquarter", value: "headquarter" },
    { label: "Merchant", value: "Merchant" },
  ];

  const paymentGatewayOptions = [
    { label: "All Payment Gateway", value: "" },
    { label: "Client", value: "client" },
    { label: "Headquarter", value: "headquarter" },
    { label: "Merchant", value: "Merchant" },
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect
        name="merchant"
        onChange={handleChangeInput}
        options={merchantOptions}
        value={payload?.merchant ?? ""}
      />
      <ControlledSelect
        name="payment_method"
        onChange={handleChangeInput}
        options={paymentMethodOptions}
        value={payload?.payment_method ?? ""}
      />
      <ControlledSelect
        name="payment_gateway"
        onChange={handleChangeInput}
        options={paymentGatewayOptions}
        value={payload?.payment_gateway ?? ""}
      />
      <ControlledSelect
        name="status"
        onChange={handleChangeInput}
        options={statusOptions}
        value={payload?.status ?? ""}
      />
    </div>
  );

  return (
    <Box>
      <div className="flex justify-end">
        <Button
          variant="contained"
          sx={{
            borderRadius: "16px",
            background: "#00941E",
            color: "white",
            mb: "16px",
            fontSize: "14px",
            lineHeight: "27.5px",
            py: "6px",
          }}
          className="text-lg">
          Export to Excel
        </Button>
      </div>
      <TableCardWithFilter
        title="Transaction List"
        renderFilter={() => <FilterComponent />}
        columns={columns}
        data={data}
      />
    </Box>
  );
};

export default TransactionPage;
