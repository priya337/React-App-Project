//Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./components/Calendar.PNG" alt="Logo" />
        <span className="navbar-title">Kanban Dashboard</span>
        <nav className="menu">
          <div className="navbar-menu">
            <img src="./components/menu-icon.png" alt="Menu" />
            <button className="menu-button">onClick={toggleMenu}</button>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
