import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import API from "../api/axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Marker icons (color based)
const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
  iconSize: [32, 32],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png",
  iconSize: [32, 32],
});

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

  mapCard: {
    background: "#12284A",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },

  mapWrapper: {
    height: "500px",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  },
};

export default function MapView() {
  const [latestData, setLatestData] = useState([]);

  // ✅ Fetch readings
  useEffect(() => {
    API.get("/readings")
      .then(res => processLatest(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Get latest reading per vehicle
  const processLatest = (readings) => {
    const map = {};

    readings.forEach(r => {
      if (!r.vehicle) return;

      const id = r.vehicle.id;

      if (!map[id] || new Date(r.ts) > new Date(map[id].ts)) {
        map[id] = r;
      }
    });

    setLatestData(Object.values(map));
  };

  // ✅ Select marker color by speed
  const getIconBySpeed = (speed) => {
    if (speed > 100) return redIcon;
    if (speed > 60) return yellowIcon;
    return greenIcon;
  };

  return (
    <div style={styles.container}>

      {/* ✅ Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>🗺️ Vehicle Live Map</h2>
        <p style={styles.subtitle}>
          Real-time location tracking of all vehicles
        </p>
      </div>

      {/* ✅ Map Card */}
      <div style={styles.mapCard}>

        <div style={styles.mapWrapper}>

          <MapContainer
            center={[12.9, 80.2]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            {/* ✅ Tile */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* ✅ Markers */}
            {latestData.map((r, i) =>
              r.latitude && r.longitude && (
                <Marker
                  key={i}
                  position={[r.latitude, r.longitude]}
                  icon={getIconBySpeed(r.speed)}
                >
                  <Popup>
                    <div>
                      <b>Vehicle ID:</b> {r.vehicle?.id} <br />
                      <b>Speed:</b> {r.speed} km/h <br />
                      <b>Temp:</b> {r.engineTemp} °C <br />
                      <b>Time:</b> {r.ts}
                    </div>
                  </Popup>
                </Marker>
              )
            )}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}
