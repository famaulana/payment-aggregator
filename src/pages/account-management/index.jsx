import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { useGetUser } from "@/features/users/hooks/useGetUsers";
import { useModalStore } from "@/store/useModalStore";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AccountManagement = () => {
  const { openModal } = useModalStore();
  const [payload, setPayload] = useState({});

  const { data: listUsers, isLoading } = useGetUser(payload);

  const columns = [
    {
      id: "id",
      label: "User ID",
      // render: (row) => (
      //   // <Box>
      //     <Typography>{row.userid}</Typography>
      //   // </Box>
      // ),
    },
    {
      id: "full_name",
      label: "Name",
      // render: (row) => (
      //   <Box>
      //     <Typography>{row.name}</Typography>
      //   </Box>
      // ),
    },
    {
      id: "email",
      label: "Email",
      // render: (row) => (
      //   <Box>
      //     <Typography>{row.name}</Typography>
      //   </Box>
      // ),
    },
    {
      id: "role",
      label: "Role",
      render: (row) => (
        // <Box>
        <Typography className="capitalize">{row.role}</Typography>
        // </Box>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (row) =>
        // <Box>
        row.status == "inactive" ? (
          <Typography className="font-bold capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            {row.status}
          </Typography>
        ) : (
          <Typography className="font-bold capitalize text-transparent bg-clip-text bg-linear-to-tl from-[#3D9743] to-[#005607]">
            {row.status}
          </Typography>
        ),
      // </Box>
    },
    {
      id: "updated_at",
      label: "Latest Update",
      // render: (row) => (
      //   <Box>
      //     <Typography>{row.latest_update}</Typography>
      //   </Box>
      // ),
    },
    {
      id: "action",
      label: "More Action",
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DefaultButton colorType="success" sx={{ marginTop: 0 }}>
            Edit
          </DefaultButton>
          <DefaultButton sx={{ marginTop: 0 }}>View Details</DefaultButton>
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
