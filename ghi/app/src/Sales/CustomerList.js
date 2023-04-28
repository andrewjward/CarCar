import React, { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const fetchurl = `http://localhost:8090/api/customers/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  const handleDelete = async (customerId) => {
    const deletedurl = `http://localhost:8090/api/customers/${customerId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!customers.length) {
    return <div>No Customers to display</div>;
  }

  return (
    <main>
      <div className="container">
        <h1 className="text-center my-4">Customers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              return (
                <tr key={customer.href}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(customer.id)}
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
    </main>
  );
}

export default CustomerList;
