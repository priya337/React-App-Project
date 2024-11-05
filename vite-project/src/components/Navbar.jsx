//Navbar.jsx
import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./Calendar.PNG" alt="Logo" />
        <span className="navbar-title">Kanban Dashboard</span>
        <div className="links">
          <NavLink to="/">Homepage</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/About">About</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
