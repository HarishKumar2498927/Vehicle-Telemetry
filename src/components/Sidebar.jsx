import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation(); // ✅ detects current route

  const styles = {
    sidebar: {
      width: "240px",
      height: "100vh",
      background: "#07162E",
      color: "white",
      padding: "20px",
    },

    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
    },

    link: {
      display: "block",
      padding: "10px 14px",
      borderRadius: "12px",
      textDecoration: "none",
      color: "#cbd5f5",
      marginBottom: "10px",
    },

    active: {
      background: "#3B82F6", // ✅ blue highlight
      color: "white",
    },
  };

  // ✅ helper function
  const getStyle = (path) => {
    return location.pathname === path
      ? { ...styles.link, ...styles.active }
      : styles.link;
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Vehicle Telemetry</h2>

      <Link to="/" style={getStyle("/")}>
        Dashboard
      </Link>

      <Link to="/vehicles" style={getStyle("/vehicles")}>
        Vehicles
      </Link>

      <Link to="/readings" style={getStyle("/readings")}>
        Readings
      </Link>

      <Link to="/analytics" style={getStyle("/analytics")}>
        Analytics
      </Link>

      <Link to="/map" style={getStyle("/map")}>
        Map
      </Link>
    </div>
  );
}