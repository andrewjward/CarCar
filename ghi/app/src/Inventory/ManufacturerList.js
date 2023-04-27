import React, { useState, useEffect } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const fetchurl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  const handleDelete = async (autoId) => {
    const deletedurl = `http://localhost:8100/api/manufacturers/${autoId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Manufacturers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {manufacturers &&
              manufacturers.map((manufacturer) => {
                return (
                  <tr key={manufacturer.id}>
                    <td>{manufacturer.name}</td>
                    <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(manufacturer.id)}
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
export default ManufacturerList;
