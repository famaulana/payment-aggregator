import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "QRIS", value: 30, color: "#9B2C6B" },
  { name: "Virtual Account", value: 23, color: "#B6F500" },
  { name: "E-Wallet", value: 18, color: "#2D9CDB" },
  { name: "Debit/Credit Card", value: 17, color: "#2E2E2E" },
  { name: "Bank Transfer", value: 13, color: "#E5E5E5" },
];

const RADIAN = Math.PI / 180;

// Custom percentage label inside slice
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <rect
        x={x - 18}
        y={y - 10}
        width={36}
        height={20}
        rx={10}
        fill="#fff"
      />
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={600}
      >
        {`${Math.round(percent * 100)}%`}
      </text>
    </g>
  );
};

const CustomLegend = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {data.map((item) => (
      <div
        key={item.name}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 4,
            backgroundColor: item.color,
          }}
        />
        <span style={{ fontSize: 13, color: "#555" }}>{item.name}</span>
      </div>
    ))}
  </div>
);

export default function PaymentRingChart() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        width: "100%",
        height: 320,
      }}
    >
      <CustomLegend />

      <ResponsiveContainer width="60%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            cornerRadius={10}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}