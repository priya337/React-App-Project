// Navbar.jsx
import { NavLink } from "react-router-dom";
import React from "react";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/">Homepage</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className="navbar-logo">
        <img src="./Calendar.PNG" alt="Logo" />
        <span className="navbar-title">Kanban Dashboard</span>
      </div>
    </nav>
  );
};

export default Navbar;
