import { NavLink } from "react-router-dom";

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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/service/technicians/new"
                  >
                    Add a technician
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/technicians">
                    List Technicians
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/service/appointments/new"
                  >
                    Make a service appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/appointments">
                    List appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/history">
                    List appointments by VIN
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/customers">
                List Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/customers/new">
                Add Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/employees">
                List Sales People
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/employees/new">
                Add Sales Person
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/sales">
                List Sales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/sales/new">
                Record Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/sales/history">Sale History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
