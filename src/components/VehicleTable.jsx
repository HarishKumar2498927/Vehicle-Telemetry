export default function VehicleTable({ vehicles, onDelete }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="mb-4 font-semibold">Vehicles</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Name</th>
            <th>Model</th>
            <th>Action</th> {/* ✅ NEW */}
          </tr>
        </thead>

        <tbody>
          {vehicles.map(v => (
            <tr key={v.id} className="text-center border-t">
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.model}</td>

              {/* ✅ DELETE BUTTON */}
              <td>
                <button
                  onClick={() => onDelete(v.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}