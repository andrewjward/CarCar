import React, { useEffect, useState } from "react";

function ListServiceHistory() {
  const [appointments, setAppointments] = useState([]);
  const [vin, setVin] = useState("");

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const fetchAppointmentList = async () => {
    const listUrl = `http://localhost:8080/api/services/${vin}/`;
    const fetchList = await fetch(listUrl);

    if (fetchList.ok) {
      const appointmentData = await fetchList.json();
      setAppointments(appointmentData.services);
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-4 d-flex flex-row-reverse align-items-center justify-content-between">
          <div>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                id="vininput"
                name="vininput"
                maxLength="17"
                onChange={handleVinChange}
                value={vin}
              ></input>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={fetchAppointmentList}
              >
                Search VIN
              </button>
            </div>
          </div>
          <div className="p-2 flex-fill">
            <h1>Service History</h1>
          </div>
        </div>
        <table className="table align-middle mt-2">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Service Reason</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.map((appointment) => {
                const date = new Date(appointment.appointment_date);
                return (
                  <tr
                    className={
                      appointment.status === "CANCELED"
                        ? "bg-danger-subtle"
                        : appointment.status === "FINISHED"
                        ? "bg-success-subtle"
                        : null
                    }
                    key={appointment.id}
                  >
                    <td>{appointment.vin}</td>
                    <td>{appointment.auto_owner}</td>
                    <td>{date.toDateString()}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.service_reason}</td>
                    <td>{appointment.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ListServiceHistory;
