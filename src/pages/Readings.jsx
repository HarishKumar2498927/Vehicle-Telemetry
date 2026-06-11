import { useEffect, useState } from "react";
import API from "../api/axios";

const styles = {
  container: {
    flex: 1,
    minHeight: "100vh",
    background: "#0B1F45",
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

  tableContainer: {
    background: "#12284A",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thead: {
    background: "#1E3A66",
  },

  th: {
    padding: "12px",
    fontSize: "13px",
    color: "#cbd5f5",
    textAlign: "center",
  },

  tr: {
    borderBottom: "1px solid #1E3A66",
    textAlign: "center",
  },

  td: {
    padding: "12px",
    fontSize: "14px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
    gap: "12px",
    alignItems: "center",
  },

  button: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#3B82F6",
    color: "white",
    cursor: "pointer",
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  }
};

export default function Readings() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    API.get("/readings").then(res => setData(res.data));
  }, []);

  // ✅ Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentData = data.slice(start, end);

  return (
    <div style={styles.container}>

      {/* ✅ Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>📊 Vehicle Readings</h2>
        <p style={styles.subtitle}>Live telemetry data for all vehicles</p>
      </div>

      {/* ✅ Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>

          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Speed</th>
              <th style={styles.th}>Temp (°C)</th>
              <th style={styles.th}>Latitude</th>
              <th style={styles.th}>Longitude</th>
              <th style={styles.th}>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((r, i) => (
              <tr
                key={i}
                style={styles.tr}
                onMouseEnter={(e) => e.currentTarget.style.background = "#1E3A66"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={styles.td}>{r.speed}</td>
                <td style={styles.td}>{r.engineTemp}</td>
                <td style={styles.td}>{r.latitude}</td>
                <td style={styles.td}>{r.longitude}</td>
                <td style={styles.td}>{r.ts}</td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* ✅ Pagination Controls */}
        <div style={styles.pagination}>
          
          <button
            style={{
              ...styles.button,
              ...(page === 1 ? styles.disabled : {}),
            }}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            style={{
              ...styles.button,
              ...(page === totalPages ? styles.disabled : {}),
            }}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>

        </div>
      </div>
    </div>
  );
}