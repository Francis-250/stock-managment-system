import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({ stats, movements }) {
  const chartData = [
    { name: "Products", value: stats?.products || 0, fill: "#3B82F6" },
    { name: "Categories", value: stats?.categories || 0, fill: "#10B981" },
    { name: "Users", value: stats?.users || 0, fill: "#8B5CF6" },
    { name: "Stock Items", value: stats?.stocks || 0, fill: "#F59E0B" },
  ];

  if (movements && movements.length > 0) {
    movements.forEach((item) => {
      chartData.push({
        name: item.type === "IN" ? "Stock In" : "Stock Out",
        value: item._sum?.quantity || 0,
        fill: item.type === "IN" ? "#22C55E" : "#EF4444",
      });
    });
  }

  return (
    <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        System Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
