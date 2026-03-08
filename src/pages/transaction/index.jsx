import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import SearchField from "@/components/molecules/form-inputs/SearchField";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { GradientPagination } from "@/components/molecules/pagination/GradientPagination";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import {
  MERCHANT_OPTIONS,
  PAYMENT_GATEWAY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { colorStatusRole } from "@/utils/string";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const TransactionPage = () => {
  const router = useRouter();

  const [payload, setPayload] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
      render: (row) => {
        const color = colorStatusRole(row.status);
        return (
          <Typography className={`font-bold capitalize ${color}`}>
            {row.status}
          </Typography>
        );
      },
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
      status: "pending",
    },
    {
      created_at: "10 January 2026, 18:00",
      id: "User-001",
      merchant_name: "Merchant A",
      payment_method: "QRIS",
      payment_gateway: "STI",
      amount: "Rp. 500.000",
      mdr_fee: "0.7%",
      status: "success",
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
        name="payment_method"
        onChange={handleChangeInput}
        options={PAYMENT_METHOD_OPTIONS}
        value={payload?.payment_method ?? ""}
      />
      <ControlledSelect
        name="payment_gateway"
        onChange={handleChangeInput}
        options={PAYMENT_GATEWAY_OPTIONS}
        value={payload?.payment_gateway ?? ""}
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
      <TableCardWithFilter
        title="Transaction List"
        renderFilter={() => <FilterComponent />}
        columns={columns}
        data={data}
      />
      <div className="flex justify-end">
        <GradientPagination totalPages={2} />
      </div>
    </Box>
  );
};

export default TransactionPage;
