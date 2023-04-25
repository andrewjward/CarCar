import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AddAutoForm from "./Inventory/AutomobileForm";
import AutomobileList from "./Inventory/AutomobileList";
import ManufacturerForm from "./Inventory/ManufacturerForm";
import ManufacturerList from "./Inventory/ManufacturerList";
import VehicleModelForm from "./Inventory/VehicleModelForm";
import VehicleModelList from "./Inventory/VehicleModelList";
import AddServiceAppointment from "./Service/ServiceAppointmentForm";
import ListServiceAppointments from "./Service/ServiceAppointmentList";
import ListServiceHistory from "./Service/ServiceHistory";
import AddTechnicianForm from "./Service/TechnicianForm";
import CustomerList from "./Sales/CustomerList";
import CustomerForm from "./Sales/CustomerForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers">
              <Route path="" element={<ManufacturerList />} />
              <Route path="new" element={<ManufacturerForm />} />
            </Route>
            <Route path="models">
              <Route path="" element={<VehicleModelList />} />
              <Route path="new" element={<VehicleModelForm />} />
            </Route>
            <Route path="automobiles">
              <Route path="" element={<AutomobileList />} />
              <Route path="new" element={<AddAutoForm />} />
            </Route>
          </Route>
          <Route path="sales">
            <Route path="customers">
              <Route path="" element={<CustomerList />} />
              <Route path="new" element={<CustomerForm />} />
            </Route>
          </Route>
          <Route path="service">
            <Route path="technicians/new" element={<AddTechnicianForm />} />
            <Route path="appointments">
              <Route path="" element={<ListServiceAppointments />} />
              <Route path="new" element={<AddServiceAppointment />} />
            </Route>
            <Route path="history" element={<ListServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
