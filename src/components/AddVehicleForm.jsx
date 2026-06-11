import { useState } from "react";
import API from "../api/axios";

export default function AddVehicleForm({ onAdd }) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVehicle = { name, model };

    API.post("/vehicles", newVehicle)
      .then(res => {
        onAdd(res.data); // update UI instantly
        setName("");
        setModel("");
      })
      .catch(err => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow rounded mb-4 flex gap-4"
    >
      <input
        type="text"
        placeholder="Vehicle Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}