import { NavLink } from "react-router";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom">
      <div className="container-fluid px-5">
        <span className="navbar-brand fw-bold">
          Hostel Student Tracker
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/students" className="nav-link">
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/checkin" className="nav-link">
                Check-In/Out
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/alerts" className="nav-link">
                Alerts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/notifications" className="nav-link">
                Notifications
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default NavigationBar;
