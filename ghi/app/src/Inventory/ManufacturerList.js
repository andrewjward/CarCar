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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Manufacturers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {manufacturers &&
              manufacturers.map((manufacturer) => {
                return (
                  <tr key={manufacturer.id}>
                    <td>{manufacturer.name}</td>
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
