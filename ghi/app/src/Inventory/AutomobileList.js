import React from "react";
import useFetch from "../useFetch";

export default function AutomobileList() {
  const autos = useFetch("http://localhost:8100/api/automobiles/", "autos");

  return (
    <div className="container">
      <div className="mt-4">
        <h1 className="text-center">Automobiles</h1>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Year</th>
              <th scope="col">Color</th>
              <th scope="col">Make</th>
              <th scope="col">Model</th>
              <th scope="col">VIN</th>
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
