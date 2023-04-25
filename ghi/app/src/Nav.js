import { NavLink, Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/manufacturers">
                Manufacturers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/manufacturers/new">
                Add Manufacturer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/models">
                Models
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/models/new">
                Add Model
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/automobiles">
                Automobiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory/automobiles/new">
                Add Automobile Service
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service/technicians/new">
                Add a technician
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service/appointments/new">
                Make a service appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service/appointments">
                List appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service/history">
                List appointments by VIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
