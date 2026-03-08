import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import SearchField from "@/components/molecules/form-inputs/SearchField";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { GradientPagination } from "@/components/molecules/pagination/GradientPagination";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { useModalStore } from "@/store/useModalStore";
import {
  MERCHANT_OPTIONS,
  PAYMENT_GATEWAY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from "@/utils/constants";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const MDRPage = () => {
  const router = useRouter();
  const { openModal } = useModalStore();

  const [payload, setPayload] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const onHistory = (id) => {
    openModal(
      "DETAIL_MDR",
      {
        header: "Riwayat Perubahan MDR",
        subheader: "Credit/Debit Card - CashUp",
      },
      "md",
    );
  };

  const onEdit = (id) => {
    openModal(
      "EDIT_MDR",
      {
        header: "Edit MDR",
        subheader: "Credit/Debit Card - CashUp",
      },
      "sm",
    );
  };

  const columns = [
    {
      id: "payment_method",
      label: "Payment Method",
    },
    {
      id: "payment_gateway",
      label: "Payment Gateway",
    },
    {
      id: "pg_fee",
      label: "PG Fee",
    },
    {
      id: "our_fee",
      label: "Our Fee",
    },
    {
      id: "total_mdr",
      label: "Total MDR",
    },
    {
      id: "updated_at",
      label: "Latest Update",
    },
    {
      id: "action",
      label: "More Action",
      width: 250,
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DefaultButton
            onClick={onEdit.bind(this, row.id)}
            colorType="success"
            sx={{ marginTop: 0 }}>
            Edit
          </DefaultButton>
          <DefaultButton
            onClick={onHistory.bind(this, row.id)}
            sx={{ marginTop: 0 }}>
            History
          </DefaultButton>
        </Box>
      ),
    },
  ];

  const data = [
    {
      payment_method: "Credit/Debit Card",
      payment_gateway: "CashUp",
      pg_fee: "1.5%",
      our_fee: "1%",
      total_mdr: "2.5%",
      updated_at: "10 January 2026, 18:00",
    },
    {
      payment_method: "Credit/Debit Card",
      payment_gateway: "CashUp",
      pg_fee: "1.5%",
      our_fee: "1%",
      total_mdr: "2.5%",
      updated_at: "10 January 2026, 18:00",
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
        title="MDR List"
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

export default MDRPage;
