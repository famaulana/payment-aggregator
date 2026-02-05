import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import { useModalStore } from "@/store/useModalStore";
import { Box, Button, Typography } from "@mui/material";

const SettingRole = () => {
  const { openModal } = useModalStore();
  const columns = [
    {
      id: "userid",
      label: "User ID",
      // render: (row) => (
      //   // <Box>
      //     <Typography>{row.userid}</Typography>
      //   // </Box>
      // ),
    },
    {
      id: "name",
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
      // render: (row) => (
      //   <Box>
      //     <Typography>{row.role}</Typography>
      //   </Box>
      // ),
    },
    {
      id: "status",
      label: "Status",
      render: (row) =>
        // <Box>
        row.status == "INACTIVE" ? (
          <Typography className="font-bold text-transparent bg-clip-text bg-linear-to-tl from-[#973D3D] to-[#E42D5D]">
            {row.status}
          </Typography>
        ) : (
          <Typography className="font-bold text-transparent bg-clip-text bg-linear-to-tl from-[#3D9743] to-[#005607]">
            {row.status}
          </Typography>
        ),
      // </Box>
    },
    {
      id: "latest_update",
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
          <DefaultButton sx={{ marginTop: 0 }}>Edit</DefaultButton>
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
  const options = [
    { label: "All Role", value: "all role" },
    { label: "Malang", value: "malang" },
    { label: "Malang", value: "malang" },
  ];
  const options2 = [
    { label: "All Status", value: "all status" },
    { label: "Malang", value: "malang" },
    { label: "Malang", value: "malang" },
  ];

  const handleCreateModal = () => {
    openModal("CREATE_USER", { header: "Create Account" }, "sm");
  };
  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect options={options} value="all role" />
      <ControlledSelect options={options2} value="all status" />
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
        data={data}
      />
    </>
  );
};

export default SettingRole;
