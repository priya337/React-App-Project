import React from "react";
import Priya from "../public/Priya.png";
import Anna from "../public/Anna.png";
import Mirela from "../public/Mirela.png";
import "./About.css";

function About() {
  return (
    <>
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
    </>
  );
}

export default About;
