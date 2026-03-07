import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import PaymentMethodChart from "@/components/molecules/charts/BarChart";
import PaymentRingChart from "@/components/molecules/charts/RingChart";
import { ControlledSelect } from "@/components/molecules/form-inputs/SelectDefault";
import { TableDefault } from "@/components/molecules/tables/TableDefault";
import UserInfoCard from "@/components/organisms/cards/InfoCardWithSubHeader";
import { useModalStore } from "@/store/useModalStore";
import { Group, Payment, Payments, Receipt, Wallet } from "@mui/icons-material";
import { Box, Card, Icon, Typography } from "@mui/material";

const TransactionSummaryCard = ({
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

const Dashboard = () => {
  const monthOptions = [
    { label: "January 2026", value: "jan" },
    { label: "February 2026", value: "feb" },
    { label: "March 2026", value: "mar" },
    { label: "April 2026", value: "apr" },
  ];

  const columns = [
    {
      id: "rank",
      label: "Rank",
      width: 70,
    },
    {
      id: "total_transaksi",
      label: "Total Transaction",
      // width: 180,
    },
    {
      id: "merchant_name",
      label: "Merchant Name",
    },
  ];

  const data = [
    {
      rank: "#1",
      total_transaksi: "Rp. 3.000.000.000",
      merchant_name: "Merchant A",
    },
    {
      rank: "#2",
      total_transaksi: "Rp. 2.000.000.000",
      merchant_name: "Merchant B",
    },
    {
      rank: "#3",
      total_transaksi: "Rp. 1.000.000.000",
      merchant_name: "Merchant C",
    },
  ];

  const cardIconData = [
    {
      title: "Our Transaction",
      amount: "Rp. 600.000.000",
      growth: 5,
      type: "percentage",
      icon: <Receipt />,
    },
    {
      title: "Our Margin",
      amount: "Rp. 100.000.000",
      growth: 5,
      type: "percentage",
      icon: <Wallet />,
    },
    {
      title: "Total Merchant",
      amount: "2,300",
      growth: 3,
      type: "count",
      scale: "new merchant",
      icon: <Group />,
    },
    {
      title: "Payment Method",
      amount: 20,
      icon: <Payments />,
    },
  ];

  return (
    <Box className="grid grid-cols-1" gap={2}>
      <div className="flex">
        <ControlledSelect
          options={monthOptions}
          className="font-bold"
          value={"jan"}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-[100rem]:grid-cols-4 gap-4">
        {cardIconData.map((item) => (
          <TransactionSummaryCard {...item} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-[100rem]:grid-cols-3 gap-4">
        <UserInfoCard
          title="Total Transaction"
          subtitle="Total transaction based on Payment Method">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-3xl font-semibold">Rp. 600.000.000</span>{" "}
            <span className="rounded-xl bg-[#589607] text-white px-2 text-sm">
              +5%
            </span>
          </div>
          <PaymentMethodChart />
        </UserInfoCard>
        <UserInfoCard
          title="Top Payment Method"
          subtitle="This a top payment method in this month">
          <PaymentRingChart />
        </UserInfoCard>
        <UserInfoCard
          title="Top 5 Merchant"
          subtitle="This is a top 5 Merchant in this month">
          <TableDefault sx={{ width: "100%" }} columns={columns} data={data} />
        </UserInfoCard>
      </div>
    </Box>
  );
};

export default Dashboard;
