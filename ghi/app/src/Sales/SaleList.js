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

  useEffect(() => {
    fetchData();
  }, []);

  if (!sales.length) {
    return <div>No Recent Sales to display</div>;
  }

  return (
    <main>
      <div className="container">
        <h1 className="text-center my-4">Sales</h1>
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
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </main>
  );
}

export default SaleList;
