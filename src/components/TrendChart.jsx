import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function TrendChart({ data, dataKey, title }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="mb-2 font-semibold">{title}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ts" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}