import React from "react";
import useFetch from "../useFetch";

export default function ManufacturerList() {
  const manufacturers = useFetch(
    "http://localhost:8100/api/manufacturers/",
    "manufacturers"
  );

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
