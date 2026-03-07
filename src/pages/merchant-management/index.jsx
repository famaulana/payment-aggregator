import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import SearchField from "@/components/molecules/form-inputs/SearchField";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { GradientPagination } from "@/components/molecules/pagination/GradientPagination";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { useGetUser } from "@/features/users/hooks/useGetUsers";
import { useModalStore } from "@/store/useModalStore";
import { ROLE_OPTIONS, STATUS_OPTIONS } from "@/utils/constants";
import { Box, Button, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

const MerchantManagement = () => {
  const { openModal } = useModalStore();
  const router = useRouter();

  const [payload, setPayload] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params = useSearchParams();
  const currentPage = Number(params.get("page")) || 1;

  const { data: listUsers } = useGetUser({
    page: currentPage,
    role: "merchant",
    ...payload,
  });
  const pagination = listUsers?.pagination ?? null;

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
      id: "id",
      label: "User ID",
      width: 90,
    },
    {
      id: "full_name",
      label: "Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "role",
      label: "Role",
      width: 100,
      render: (row) => (
        <Typography className="capitalize">{row.role}</Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      width: 100,
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
      id: "updated_at",
      label: "Latest Update",
    },
    {
      id: "action",
      label: "More Action",
      width: 300,
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DefaultButton colorType="success" sx={{ marginTop: 0 }}>
            Edit
          </DefaultButton>
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
      userid: "User-001",
      name: "Rohman",
      email: "dummy@email.com",
      role: "Admin",
      status: "ACTIVE",
      latest_update: "10 January 2029",
    },
    {
      userid: "User-001",
      name: "Rohman",
      email: "dummy@email.com",
      role: "Admin",
      status: "INACTIVE",
      latest_update: "10 January 2029",
    },
  ];

  const handleCreateModal = () => {
    openModal("CREATE_USER", { header: "Create Account" }, "sm");
  };

  const handleChangeRole = (e) => {
    setPayload({ ...payload, role: e.target.value });
  };

  const handleChangeStatus = (e) => {
    setPayload({ ...payload, status: e.target.value });
  };

  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect
        onChange={handleChangeRole}
        options={ROLE_OPTIONS}
        value={payload?.role ?? ""}
      />
      <ControlledSelect
        onChange={handleChangeStatus}
        options={STATUS_OPTIONS}
        value={payload?.status ?? ""}
      />
      <Button
        variant="contained"
        onClick={handleCreateModal}
        sx={{ bgcolor: "#3A416F", borderRadius: "16px" }}>
        Create Account
      </Button>
    </div>
  );

  return (
    <>
      <div className="flex justify-between mb-6">
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
        title="Account List"
        renderFilter={() => <FilterComponent />}
        columns={columns}
        data={listUsers?.data ?? data}
      />
      {pagination && (
        <div className="flex justify-end mt-2">
          <GradientPagination
            totalPages={
              pagination?.total && pagination?.per_page
                ? Math.ceil(pagination?.total / pagination?.per_page)
                : 0
            }
          />
        </div>
      )}
    </>
  );
};

export default MerchantManagement;
