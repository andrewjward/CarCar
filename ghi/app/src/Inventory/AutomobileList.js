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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Automobiles</h1>
        <table className="table">
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
