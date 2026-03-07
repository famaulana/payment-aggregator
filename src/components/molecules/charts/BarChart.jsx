import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Debit/Credit", value: 100, color: "#1DA1D2" },
  { name: "QRIS", value: 280, color: "#9B2C6B" },
  { name: "E-Wallet", value: 180, color: "#1C91C0" },
  { name: "Virtual Account", value: 250, color: "#B6F500" },
  { name: "Bank Transfer", value: 120, color: "#D9D9D9" },
];

const formatRupiah = (value) =>
  `Rp. ${value.toLocaleString("id-ID")}.000.000`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: "8px",
          fontSize: "12px",
        }}
      >
        {formatRupiah(payload[0].value)}
      </div>
    );
  }
  return null;
};

// ✅ Custom Bar Shape
const CustomBar = (props) => {
  const { x, y, width, height, payload } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={payload.color}
      rx={8} // rounded corners
      ry={8}
    />
  );
};

export default function PaymentMethodChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="value"
          shape={<CustomBar />}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}