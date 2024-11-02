//Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./Calendar.PNG" alt="Logo" />
        <span className="navbar-title">Kanban Dashboard</span>
      </div>
    </nav>
  );
};

export default Navbar;
