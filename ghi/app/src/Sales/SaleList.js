import React, { useState, useEffect } from "react";

function SaleList() {
  const [sales, setSales] = useState([]);

  const fetchData = async () => {
    const fetchurl = `http://localhost:8090/api/sales/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  };

//   const handleDelete = async (peopleId) => {
//     const deletedurl = `http://localhost:8090/api/salespeople/${peopleId}`;
//     const response = await fetch(deletedurl, { method: "DELETE" });
//     fetchData();
//   };

  useEffect(() => {
    fetchData();
  }, []);

  if (!sales.length) {
    return <div>No Recent Sales to display</div>;
  }

  return (
    <main>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Automobile VIN</th>
            <th scope="col">Sales Person</th>
            <th scope="col">Customer</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            return (
              <tr key={sale.href}>
                <td>{sale.automobile.vin}</td>
                <td>{sale.sales_person.first_name} {sale.sales_person.last_name}</td>
                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                <td>{sale.price}</td>
                {/* <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default SaleList;
