import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { SuccessIcon } from "@/components/atoms/icons/SuccessIcon";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableCardWithFilter } from "@/components/molecules/tables/TableCardWithFilter";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";
import { useGetUserDetail } from "@/features/users/hooks/useGetUserDetail";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: detailData } = useGetUserDetail(id);

  const onDetail = (id) => {
    console.log(id);
  };

  const columns = [
    {
      id: "id",
      label: "User ID",
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
      id: "activity_type",
      label: "Activity Type",
    },
    {
      id: "description",
      label: "Description",
    },
    {
      id: "ip_address",
      label: "IP Address",
    },
    {
      id: "created_at",
      label: "Activity Date",
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

  const data = [
    {
      id: "User-001",
      role: "Merchant",
      activity_type: "Login",
      description: "Ini description activity",
      ip_address: "191.121.21.3",
      created_at: "10 January 2029",
    },
    {
      id: "User-001",
      role: "Merchant",
      activity_type: "Login",
      description: "Ini description activity",
      ip_address: "191.121.21.4",
      created_at: "10 January 2029",
    },
  ];

  const roleOptions = [
    { label: "All Role", value: "" },
    { label: "Client", value: "client" },
    { label: "Headquarter", value: "headquarter" },
    { label: "Merchant", value: "Merchant" },
  ];

  const statusOptions = [
    { label: "All Activity", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleChangeRole = (e) => {
    console.log(e);
    // setPayload({ ...payload, role: e.target.value });
  };

  const handleChangeStatus = (e) => {
    console.log(e);
    // setPayload({ ...payload, status: e.target.value });
  };

  const InfoRow = ({ label, value, isStatus }) => (
    <Box className="flex justify-between items-center py-3">
      <Typography
        sx={{ fontWeight: 500 }}
        className=" font-semibold text-sm capitalize tracking-tight">
        {label}
      </Typography>
      <Typography
        className={`text-sm font-medium capitalize ${
          isStatus == "active" ? "text-green-600 font-bold" : "text-slate-400"
        }`}>
        {value || "-"}
      </Typography>
    </Box>
  );

  const FilterComponent = () => (
    <div className="flex space-x-4">
      <ControlledSelect
        onChange={handleChangeRole}
        options={roleOptions}
        value={""}
      />
      <ControlledSelect
        onChange={handleChangeStatus}
        options={statusOptions}
        value={""}
      />
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="contained"
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
          title="User Information"
          subtitle="All Detail information about this user">
          <InfoRow label="User ID" value={detailData?.data.id} />
          <InfoRow label="Name" value={detailData?.data.full_name} />
          <InfoRow label="Email" value={detailData?.data.email} />
          <InfoRow label="Role" value={detailData?.data.role} />
          <InfoRow
            label="Status"
            value={detailData?.data.status}
            isStatus={detailData?.data.status}
          />
          <InfoRow label="Latest Update" value={detailData?.data.updated_at} />
        </UserInfoCard>
        <UserInfoCard
          title="User Permission"
          subtitle="All Permission on this user"
          className="grid grid-cols-2 gap-6">
          {detailData?.data.permissions.map((item) => {
            const modifiedValue = item.replaceAll("_", " ");
            return (
              <div className="flex item-center space-x-2">
                <div className="flex items-center">
                  <SuccessIcon size="20" />
                </div>
                <div className="flex items-center">
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                    className="capitalize">
                    {modifiedValue}
                  </Typography>
                </div>
              </div>
            );
          })}
        </UserInfoCard>
        <div className="col-span-2">
          <TableCardWithFilter
            title="Activity List"
            renderFilter={() => <FilterComponent />}
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default UserDetail;
