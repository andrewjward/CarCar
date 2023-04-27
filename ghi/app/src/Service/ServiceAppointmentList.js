import React, { useEffect, useState } from "react";

function ListServiceAppointments() {
  const [services, setAppointments] = useState([]);
  const [status, setStatus] = useState(0);

  const fetchAppointmentList = async () => {
    const listUrl = "http://localhost:8080/api/services/upcoming/";
    const fetchList = await fetch(listUrl);

    if (fetchList.ok) {
      const appointmentData = await fetchList.json();
      setAppointments(appointmentData.services);
    }
  };

  useEffect(() => {
    fetchAppointmentList();
  }, [status]);

  const handleAppointmentCancel = async (appointment, event) => {
    const cancelUrl = `http://localhost:8080/api/services/${appointment}/cancel/`;

    const response = await fetch(cancelUrl, { method: "PUT" });

    if (response.ok) {
      setStatus(status + 1);
    }
  };

  const handleAppointmentFinish = async (appointment, event) => {
    const finishUrl = `http://localhost:8080/api/services/${appointment}/finish/`;

    const response = await fetch(finishUrl, { method: "PUT" });

    if (response.ok) {
      setStatus(status + 1);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Upcoming Appointments</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Service Reason</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((appointment) => {
              const date = new Date(appointment.appointment_date);

              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.auto_owner}</td>
                  <td>{date.toDateString()}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.service_reason}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAppointmentCancel(appointment.id)}
                    >
                      CANCEL
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAppointmentFinish(appointment.id)}
                    >
                      FINISH
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ListServiceAppointments;
