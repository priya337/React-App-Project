import React from "react";
import "./Homepage.css";
import logo from "../public/ironhack logo.png";
import Kanban from "../public/kanban-homepage.png";

function Homepage() {
  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo-ironhack" />
      <h1>Welcome to Ironhack Kanban Board!</h1>
      <p>
        Try our popular framework used to implement Agile and DevOps software
        development.
      </p>
      <p>
        Clear organisation and priority with grouped lists:{" "}
        <strong>
          <span style={{ color: "red" }}>To Do</span>
        </strong>
        ,{" "}
        <strong>
          <span style={{ color: "orange" }}>In Progress</span>
        </strong>{" "}
        and{" "}
        <strong>
          <span style={{ color: "green" }}>Done</span>
        </strong>
      </p>
      <br />
      <img src={Kanban} alt="kanban" className="kanban-homepage" />
    </div>
  );
}
export default Homepage;
