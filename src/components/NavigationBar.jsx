import React from 'react'
import { NavLink } from 'react-router'

function NavigationBar() {
  return (
    <div className="navbar navbar-expand bg-light fixed-top px-5 border-b">
        <span className="navbar-brand fw-bold">Hostel Student Tracking</span>
        <ul className="navbar-nav ms-auto flex-row gap-4">
          <li className="nav-item">
            <NavLink to='dashboard' className="nav-link">Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='students' className="nav-link">Students</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='checkin' className="nav-link">Check-In/Out</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='alerts' className="nav-link">Alerts</NavLink>
          </li> 
          <li className="nav-item">
            <NavLink to='notifications' className="nav-link">Notifications</NavLink>
          </li> 
          <li className="nav-item">
            <NavLink to='settings' className="nav-link">Settings</NavLink>
          </li> 
        </ul>
    </div>
  )
}

export default NavigationBar
