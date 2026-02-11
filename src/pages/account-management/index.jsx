import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { useGetUser } from "@/features/users/hooks/useGetUsers";
import { useModalStore } from "@/store/useModalStore";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const AccountManagement = () => {
  const { openModal } = useModalStore();
  const router = useRouter();

  const [payload, setPayload] = useState({});

  const { data: listUsers, refetch } = useGetUser(payload);

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
      render: (row) => (
        <Typography className="capitalize">{row.role}</Typography>
      ),
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
      id: "updated_at",
      label: "Latest Update",
    },
    {
      id: "action",
      label: "More Action",
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

  const roleOptions = [
    { label: "All Role", value: "" },
    { label: "Client", value: "client" },
    { label: "Headquarter", value: "headquarter" },
    { label: "Merchant", value: "Merchant" },
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
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
        options={roleOptions}
        value={payload?.role ?? ""}
      />
      <ControlledSelect
        onChange={handleChangeStatus}
        options={statusOptions}
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
      <TableCardWithFilter
        title="Account List"
        renderFilter={() => <FilterComponent />}
        columns={columns}
        data={listUsers?.data ?? data}
      />
    </>
  );
};

export default AccountManagement;
