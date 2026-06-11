import { useEffect, useState } from "react";
import API from "../api/axios";
import TrendChart from "../components/TrendChart";
import FilterBar from "../components/FilterBar";

const styles = {
  container: {
    flex: 1,
    minHeight: "100vh",
    background: "#0B1F45", // ✅ main background
    padding: "24px",
    color: "white",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  filterBox: {
    background: "#12284A",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    marginBottom: "20px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  chartCard: {
    background: "#12284A",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },
};

export default function Analytics() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Fetch data initially
  useEffect(() => {
    API.get("/readings").then(res => {
      setData(res.data);
      setFilteredData(res.data);
    });
  }, []);

  // ✅ FILTER FUNCTION
  const applyFilter = ({ vehicleId, timeWindow }) => {
    let result = [...data];

    // ✅ Filter by vehicle
    if (vehicleId) {
      result = result.filter(
        r => r.vehicle && String(r.vehicle.id) === vehicleId
      );
    }

    // ✅ Filter by time window
    const now = new Date();
    let hours = 24;

    if (timeWindow === "1h") hours = 1;
    if (timeWindow === "6h") hours = 6;

    const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);

    result = result.filter(r => new Date(r.ts) >= cutoff);

    setFilteredData(result);
  };

  return (
    <div style={styles.container}>

      {/* ✅ Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>📈 Analytics</h2>
        <p style={styles.subtitle}>Insights & trends from vehicle telemetry data</p>
      </div>

      {/* ✅ Filter Section */}
      <div style={styles.filterBox}>
        <FilterBar onFilter={applyFilter} />
      </div>

      {/* ✅ Charts */}
      <div style={styles.chartGrid}>

        <div style={styles.chartCard}>
          <TrendChart
            data={filteredData}
            dataKey="speed"
            title="Speed Trend"
          />
        </div>

        <div style={styles.chartCard}>
          <TrendChart
            data={filteredData}
            dataKey="engineTemp"
            title="Temperature Trend"
          />
        </div>

      </div>

    </div>
  );
}