import React, { useEffect, useState } from "react";

function SaleHistory() {
  const [sales, setSales] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchSalesData = async () => {
    const fetchurl = `http://localhost:8090/api/sales/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    }
  };
  const fetchEmployeeData = async () => {
    const fetchurl = `http://localhost:8090/api/salespeople/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setEmployees(data.people);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchEmployeeData();
  }, []);

  const handleChangeSale = (event) => {
    setSelectedId(event.target.value);
  };

  return (
    <>
    <div className="row">
        <div className="shadow p-4 mt-4">
          <h1>Record a Sale</h1>
    <select onChange={handleChangeSale} value= {selectedId} name="employee" id="employee" className='form-select' required>
    <option value=''>Choose Sales Person</option>
    {employees.map(employee => {
      return (
        <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} (ID #{employee.employee_id})</option>
      )
    })}
  </select>
    <table className="table table-striped">
      <thead>
          <tr>
            <th scope="col">Sales Person</th>
            <th scope="col">Automobile VIN</th>
            <th scope="col">Customer</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
        {sales
          .filter((value) => {
            console.log(value)
            return Number(value.sales_person.id) === Number(selectedId);
          })
          .map((item, i) => (
            <tr key={i}>
              <td>{item.sales_person.first_name} {item.sales_person.last_name}</td>
              <td>{item.automobile.vin}</td>
              <td>{item.customer.first_name} {item.customer.last_name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </>
  );
}
export default SaleHistory
