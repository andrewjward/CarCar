import React, { useEffect, useState } from "react";

function ListTechnicians() {
  const [technicians, setTechnicians] = useState([]);

  const fetchTechnicians = async () => {
    const technicianUrl = "http://localhost:8080/api/services/tech/list/";
    const response = await fetch(technicianUrl);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.employee_number}</td>
              <td>{technician.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ListTechnicians;
