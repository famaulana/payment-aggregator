import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import SearchField from "@/components/molecules/form-inputs/SearchField";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import {
  MERCHANT_OPTIONS,
  PAYMENT_GATEWAY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { Payments, Receipt, Wallet } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const SummaryCard = ({
  title,
  amount,
  growth,
  type = "percentage",
  scale,
  icon = "account_balance_wallet",
}) => {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      elevation={1}>
      {/* Left Section */}
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight={700}>
            {amount}
          </Typography>

          {type == "percentage" && typeof growth === "number" && (
            <Typography
              variant="body2"
              fontWeight={600}
              color={growth >= 0 ? "success.main" : "error.main"}>
              {growth >= 0 ? `+${growth}%` : `-${growth}%`}
            </Typography>
          )}

          {type == "count" && typeof growth === "number" && (
            <Typography
              variant="body2"
              fontWeight={600}
              color={growth >= 0 ? "success.main" : "error.main"}>
              {growth >= 0 ? `+${growth} ${scale}` : `-${growth} ${scale}`}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right Icon with Gradient Background */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          background: "linear-gradient(135deg, #EC407A, #7E57C2)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
        {icon}
      </Box>
    </Card>
  );
};

const SettlementPage = () => {
  const router = useRouter();

  const [payload, setPayload] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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

  const cardIconData = [
    {
      title: "Total Requested",
      amount: "Rp. 250.000.000",
      icon: <Receipt />,
    },
    {
      title: "Total Approved / Settled",
      amount: "Rp. 235.000.000",
      icon: <Wallet />,
    },
    {
      title: "Floating Fund Balance",
      amount: "Rp. 235.000.000",
      icon: <Payments />,
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect
        name="merchant"
        onChange={handleChangeInput}
        options={MERCHANT_OPTIONS}
        value={payload?.merchant ?? ""}
      />
      <ControlledSelect
        name="status"
        onChange={handleChangeInput}
        options={STATUS_OPTIONS}
        value={payload?.status ?? ""}
      />
    </div>
  );

  return (
    <Box>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <SearchField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to page 1 on new search
            }}
          />
        </div>
        <div className="flex items-center">
          <Button
            variant="contained"
            sx={{
              borderRadius: "16px",
              background: "#00941E",
              color: "white",
              fontSize: "14px",
              lineHeight: "27.5px",
              py: "6px",
            }}
            className="text-lg">
            Export to Excel
          </Button>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {cardIconData.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            amount={item.amount}
            icon={item.icon}
          />
        ))}
      </div>
      <TableCardWithFilter
        title="Settlement List"
        renderFilter={() => <FilterComponent />}
        columns={columns}
        data={data}
      />
    </Box>
  );
};

export default SettlementPage;
