import React, { useState, useEffect } from "react";

function EmployeeList() {
  const [people, setEmployees] = useState([]);

  const fetchData = async () => {
    const fetchurl = `http://localhost:8090/api/salespeople/`;
    const response = await fetch(fetchurl);
    if (response.ok) {
      const data = await response.json();
      setEmployees(data.people);
    }
  };

  const handleDelete = async (peopleId) => {
    const deletedurl = `http://localhost:8090/api/salespeople/${peopleId}`;
    const response = await fetch(deletedurl, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!people.length) {
    return <div>No Sales People to display</div>;
  }

  return (
    <main>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Id Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {people.map((employee) => {
            return (
              <tr key={employee.href}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.employee_id}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default EmployeeList;
