// export default function Card({ title, value }) {
//   return (
//     <div className="bg-white p-4 shadow rounded">
//       <p className="text-gray-500">{title}</p>
//       <h2 className="text-2xl font-bold">{value}</h2>
//     </div>
//   );
// }



export default function Card({ title, value, type }) {
  
  const styles = {
    base: {
      padding: "18px",
      borderRadius: "16px",
      color: "white",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "110px",
      position: "relative",
      overflow: "hidden"
    },

    blue: {
      background: "linear-gradient(135deg, #2563eb, #1e3a8a)"
    },

    green: {
      background: "linear-gradient(135deg, #16a34a, #065f46)"
    },

    purple: {
      background: "linear-gradient(135deg, #7c3aed, #4c1d95)"
    },

    orange: {
      background: "linear-gradient(135deg, #f59e0b, #92400e)"
    },

    title: {
      fontSize: "13px",
      color: "#cbd5f5",
      marginBottom: "6px"
    },

    value: {
      fontSize: "22px",
      fontWeight: "bold"
    },

    wave: {
      position: "absolute",
      bottom: "0",
      right: "0",
      opacity: 0.2,
      fontSize: "60px"
    }
  };

  // ✅ Map types to styles
  const bgStyle =
    type === "vehicles"
      ? styles.blue
      : type === "active"
      ? styles.green
      : type === "speed"
      ? styles.purple
      : styles.orange;

  return (
    <div style={{ ...styles.base, ...bgStyle }}>
      <div>
        <p style={styles.title}>{title}</p>
        <h2 style={styles.value}>{value}</h2>
      </div>

      {/* ✅ Decorative wave/icon */}
      <div style={styles.wave}>⟿</div>
    </div>
  );
}
