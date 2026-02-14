import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StockChart({ data }) {
  const chartData = [
    { name: "Total Products", value: data.totalProducts || 0 },
    { name: "Low Stock", value: data.lowStockItems || 0 },
    { name: "Out of Stock", value: data.outOfStock || 0 },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="mb-4 font-semibold">Inventory Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;