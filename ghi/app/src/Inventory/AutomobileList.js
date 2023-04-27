import React, { useState, useEffect } from "react";

function AutomobileList() {
  const [autos, setAutos] = useState([]);
  const fetchData = async () => {
    const fetchurl = "http://localhost:8100/api/automobiles/";
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  };

  const handleDelete = async (autoId) => {
    const deletedurl = `http://localhost:8100/api/automobiles/${autoId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Automobiles</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Year</th>
              <th>Color</th>
              <th>Make</th>
              <th>Model</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {autos.map((auto) => {
              return (
                <tr key={auto.href}>
                  <td className="w-25">
                    <img
                      src={auto.model.picture_url}
                      className="img-thumbnail"
                    />
                  </td>
                  <td>{auto.year}</td>
                  <td>{auto.color}</td>
                  <td>{auto.model.manufacturer.name}</td>
                  <td>{auto.model.name}</td>
                  <td>{auto.vin}</td>
                  <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(auto.vin)}
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
export default AutomobileList;
