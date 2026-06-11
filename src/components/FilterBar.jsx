import { useEffect, useState } from "react";
import API from "../api/axios";

export default function FilterBar({ onFilter }) {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const [timeWindow, setTimeWindow] = useState("24h");

  useEffect(() => {
    API.get("/vehicles").then(res => setVehicles(res.data));
  }, []);

  const handleApply = () => {
    onFilter({ vehicleId, timeWindow });
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-4 flex gap-4 items-center">

      {/* ✅ Vehicle Dropdown */}
      <select
        value={vehicleId}
        onChange={(e) => setVehicleId(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Vehicles</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* ✅ Time Window */}
      <select
        value={timeWindow}
        onChange={(e) => setTimeWindow(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="1h">Last 1 Hour</option>
        <option value="6h">Last 6 Hours</option>
        <option value="24h">Last 24 Hours</option>
      </select>

      {/* ✅ Apply Button */}
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}