import { useEffect, useState } from "react";
import API from "../api/axios";
import VehicleTable from "../components/VehicleTable";
import AddVehicleForm from "../components/AddVehicleForm";

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
    marginBottom: "6px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  sectionCard: {
    background: "#12284A",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    marginBottom: "20px",
  },

  tableCard: {
    background: "#12284A",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  }
};

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  // ✅ Fetch vehicles
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    API.get("/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  };

  // ✅ ADD VEHICLE
  const handleAddVehicle = (newVehicle) => {
    setVehicles(prev => [...prev, newVehicle]);
  };

  // ✅ DELETE VEHICLE
  const handleDeleteVehicle = (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    API.delete(`/vehicles/${id}`)
      .then(() => {
        setVehicles(prev => prev.filter(v => v.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={styles.container}>

      {/* ✅ Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🚗 Vehicles</h1>
        <p style={styles.subtitle}>Manage and monitor all registered vehicles</p>
      </div>

      {/* ✅ Add Vehicle Form Section */}
      <div style={styles.sectionCard}>
        <AddVehicleForm onAdd={handleAddVehicle} />
      </div>

      {/* ✅ Vehicle Table Section */}
      <div style={styles.tableCard}>
        <VehicleTable
          vehicles={vehicles}
          onDelete={handleDeleteVehicle}
        />
      </div>

    </div>
  );
}