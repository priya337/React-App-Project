// About.jsx
import React from "react";
import Priya from "../public/Priya.png";
import Anna from "../public/Anna.png";
import Mirela from "../public/Mirela.png";
import "./About.css";
import Sidebar from "./Sidebar"; // Import Sidebar

function About() {
  return (
    <>
      <div className="dashboard-container">
        <Sidebar />{" "}
        {/* No filters prop passed, so only "Back to Home" will render */}
        <div className="about-main-content">
          <div className="about-container">
            <h1>Meet the team!</h1>
            <ul className="about-list-items">
              <li>
                <img src={Priya} alt="profile" className="profile-image" />
                <br />
                Priya
              </li>
              <li>
                <img src={Mirela} alt="profile" className="profile-image" />
                <br />
                Mirela
              </li>
              <li>
                <img src={Anna} alt="profile" className="profile-image" />
                <br />
                Anna
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
