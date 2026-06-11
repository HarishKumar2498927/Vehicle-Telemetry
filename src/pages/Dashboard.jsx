import { useEffect, useState } from "react";
import API from "../api/axios";
import Card from "../components/Card";
import MapLite from "../components/MapLite";

const styles = {
  container: {
    flex: 1,
    minHeight: "100vh",
    background: "#0B1F45",
    padding: "24px",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },

  mapSection: {
    background: "#12284A",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
  }
};

export default function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [avgTemp, setAvgTemp] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);

  useEffect(() => {
    API.get("/readings").then(res => setReadings(res.data));

    API.get("/vehicles").then(res => {
      setVehicles(res.data);

      if (res.data.length > 0) {
        const vehicleId = res.data[0].id;

        API.get(`/readings/stats/${vehicleId}`)
          .then(r => {
            setTopSpeed(r.data.topSpeed);
            setAvgTemp(r.data.avgTemp);
          })
          .catch(err => console.error(err));
      }
    });
  }, []);

  return (
    <div style={styles.container}>

      {/* ✅ Gradient Cards (Like Image 2) */}
      <div style={styles.grid}>

        <Card
          title="Total Vehicles"
          value={vehicles.length}
          type="vehicles"
        />

        <Card
          title="Active Vehicles"
          value={vehicles.length}
          type="active"
        />

        <Card
          title="Average Speed"
          value={`${topSpeed} km/h`}
          type="speed"
        />

        <Card
          title="Avg Engine Temp"
          value={`${avgTemp.toFixed(2)} °C`}
          type="temp"
        />

      </div>

      {/* ✅ Map Section */}
      <div style={styles.mapSection}>
        <MapLite readings={readings} />
      </div>

    </div>
  );
}