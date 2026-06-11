import { useState } from "react";

const styles = {
  container: {
    background: "#12284A",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },

  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "16px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "10px",
    color: "#cbd5f5",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #1E3A66",
  },

  row: {
    cursor: "pointer",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    gap: "10px",
  },

  button: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#3B82F6",
    color: "white",
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default function MapLite({ readings }) {
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  // ✅ Calculate pages
  const totalPages = Math.ceil(readings.length / rowsPerPage);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const currentData = readings.slice(start, end);

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Locations</h2>

      {/* ✅ TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Vehicle</th>
            <th style={styles.th}>Lat</th>
            <th style={styles.th}>Lon</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((r, i) => (
            <tr
              key={i}
              style={styles.row}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1E3A66")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={styles.td}>{r.vehicle?.id}</td>
              <td style={styles.td}>{r.latitude}</td>
              <td style={styles.td}>{r.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ PAGINATION */}
      <div style={styles.pagination}>
        
        {/* ✅ PREV */}
        <button
          style={{
            ...styles.button,
            ...(page === 1 ? styles.disabled : {}),
          }}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ← Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        {/* ✅ NEXT */}
        <button
          style={{
            ...styles.button,
            ...(page === totalPages ? styles.disabled : {}),
          }}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}