import React, { useState, useEffect } from "react";

function VehicleModelList() {
  const [vehicleModels, setVehicleModels] = useState([]);

  const fetchVehicleModels = async () => {
    const response = await fetch("http://localhost:8100/api/models/");
    if (response.ok) {
      const data = await response.json();
      setVehicleModels(data.models);
    }
  };

  const handleDelete = async (autoId) => {
    const deletedurl = `http://localhost:8100/api/models/${autoId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchVehicleModels();
  };

  useEffect(() => {
    fetchVehicleModels();
  }, []);

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Vehicle Models</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {vehicleModels &&
              vehicleModels.map((model) => {
                return (
                  <tr key={model.href}>
                    <td>{model.manufacturer.name}</td>
                    <td>{model.name}</td>
                    <td>
                      <img src={model.picture_url} style={{ width: "150px" }} />
                    </td>
                    <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(model.id)}
                  >
                    Delete
                  </button>
                </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default VehicleModelList;
