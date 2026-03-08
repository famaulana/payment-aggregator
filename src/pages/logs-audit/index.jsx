"use no memo";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/utils/useDebounce";
import { useGetActivities } from "@/features/logs/hooks/getActivities";
import { Box, Button, Typography } from "@mui/material";
import { GradientPagination } from "@/components/molecules/pagination/GradientPagination";
import { TableDefault } from "@/components/molecules/tables/TableDefault";
import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { CardDefault } from "@/components/atoms/card/DefaultCard";
import { useRouter } from "next/router";
import DefaultNavbar from "@/components/molecules/navbar/DefaultNavbar";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { ROLE_OPTIONS, STATUS_LOGS_OPTIONS } from "@/utils/constants";
import SearchField from "@/components/molecules/form-inputs/SearchField";
import { colorStatusRole } from "@/utils/string";

const LogsAuditPage = () => {
  const [search, setSearch] = useState("");
  const [payload, setPayload] = useState({});
  const [tab, setTab] = useState(0);

  const router = useRouter();

  // 1. Debounce the raw input value
  const debouncedSearch = useDebounce(search, 500);

  // 2. Fetch data based on debounced search and current page
  //   const { data } = useGetActivities({
  //     search: debouncedSearch,
  //     ...payload,
  //   });

  const data = [
    {
      id: "act-001",
      tab_type: "external",
      source_system: "Payment Gateway",
      activity_type: "Inbound",
      event_type: "Payment Request",
      ref_id: "REF-10000, TXN-1000",
      status: "success",
      activity_date: "2026-01-10T18:00:00Z",
      desc: null,
      ip_address: null,
      user_id: null,
      role: null,
    },
    {
      id: "act-002",
      tab_type: "internal",
      source_system: "Internal System",
      activity_type: "Login",
      event_type: "System Access",
      ref_id: "SES-9921",
      status: "success",
      activity_date: "2026-01-10T18:00:00Z",
      desc: "User performed action successfully",
      ip_address: "192.168.1.123",
      user_id: "User-001",
      role: "Admin",
    },
    {
      id: "act-003",
      tab_type: "external",
      source_system: "POS",
      activity_type: "Inbound",
      event_type: "Callback",
      ref_id: "REF-10001, TXN-1001",
      status: "pending",
      activity_date: "2026-01-10T18:00:00Z",
      desc: null,
      ip_address: null,
      user_id: null,
      role: null,
    },
    {
      id: "act-004",
      tab_type: "external",
      source_system: "Payment Gateway",
      activity_type: "Inbound",
      event_type: "Payment Request",
      ref_id: "REF-10004, TXN-1004",
      status: "failed",
      activity_date: "2026-01-10T18:00:00Z",
      desc: null,
      ip_address: null,
      user_id: null,
      role: null,
    },
    {
      id: "act-005",
      tab_type: "internal",
      source_system: "Internal System",
      activity_type: "Settlement Approval",
      event_type: "Financial Action",
      ref_id: "STL-5521",
      status: "success",
      activity_date: "2026-01-10T18:00:00Z",
      desc: "User performed action successfully",
      ip_address: "192.168.1.123",
      user_id: "User-003",
      role: "Admin",
    },
  ];

  const onDetail = (id) => {
    if (tab == 1) {
      router.push(
        {
          pathname: `${router.pathname}/detail`,
        },
        undefined,
        { shallow: true },
      );
    } else {
      router.push("../account-management/activity");
    }
  };

  const navbarList = [
    {
      label: "Internal Activity",
    },
    {
      label: "External Activity",
    },
  ];

  const columns = [
    {
      id: tab == 1 ? "source_system" : "user_id",
      label: tab == 1 ? "Source System" : "User ID",
    },
    {
      id: tab == 1 ? "activity_type" : "role",
      label: tab == 1 ? "Activity Type" : "Role",
    },
    {
      id: tab == 1 ? "event_type" : "activity_type",
      label: tab == 1 ? "Event Type" : "Activity Type",
    },
    {
      id: tab == 1 ? "ref_id" : "desc",
      label: tab == 1 ? "Related Ref ID" : "Description",
    },
    {
      id: tab == 1 ? "status" : "ip_address",
      label: tab == 1 ? "Status" : "IP Address",
      render: (row) => {
        const color = colorStatusRole(row.status);

        return tab == 1 ? (
          <Typography className={`font-bold capitalize ${color}`}>
            {row.status ?? "-"}
          </Typography>
        ) : (
          (row.status ?? "-")
        );
      },
    },
    {
      id: "activity_date",
      label: "Activity Date",
    },
    {
      id: "actions",
      label: "More Actions",
      render: ({ row }) => (
        <div>
          <DefaultButton
            sx={{
              marginTop: "4px",
              padding: "6px 12px",
            }}
            onClick={onDetail.bind(this, row?.id)}>
            View Details
          </DefaultButton>
        </div>
      ),
    },
  ];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  return (
    <Box className="min-h-screen">
      {/* Search Section */}
      <Box className="mb-6 w-full flex justify-between items-center">
        <div>
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
      </Box>

      <CardDefault>
        <div className="flex justify-between mb-4">
          <DefaultNavbar
            value={tab}
            onChange={(_, v) => setTab(v)}
            navItems={navbarList}
          />
          <div className="flex items-center space-x-2">
            {tab == 0 && (
              <ControlledSelect
                onChange={handleChangeInput}
                options={ROLE_OPTIONS}
                value={payload?.role ?? ""}
              />
            )}
            {tab == 1 && (
              <ControlledSelect
                onChange={handleChangeInput}
                options={ROLE_OPTIONS}
                value={payload?.source ?? ""}
              />
            )}
            <ControlledSelect
              onChange={handleChangeInput}
              options={ROLE_OPTIONS}
              value={payload?.activity ?? ""}
            />
            {tab == 1 && (
              <>
                <ControlledSelect
                  onChange={handleChangeInput}
                  options={ROLE_OPTIONS}
                  value={payload?.event ?? ""}
                />
                <ControlledSelect
                  onChange={handleChangeInput}
                  options={STATUS_LOGS_OPTIONS}
                  value={payload?.status ?? ""}
                />
              </>
            )}
          </div>
        </div>
        <TableDefault columns={columns} data={data} />
      </CardDefault>

      {/* Pagination Section */}
      <Box className="flex justify-end mt-6">
        <GradientPagination totalPages={2} />
      </Box>
    </Box>
  );
};

export default LogsAuditPage;
