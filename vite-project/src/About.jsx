// About.jsx
import React from "react";
import Sidebar from "./Sidebar"; // Import Sidebar

function About() {
  return (
    <div className="dashboard-container">
      <Sidebar /> {/* No filters prop passed, so only "Back to Home" will render */}
      <div className="main-content">
        <div className="about-container">
          <h1>Meet the team!</h1>
          <ul className="about-list-items">
            <li>Priya</li>
            <li>Mirela</li>
            <li>Anna</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
