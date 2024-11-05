// Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ filters, onFilterChange, showBackToDashboard, showCreateTaskButton }) => {
  return (
    <div className="sidebar">
      {/* Back link */}
      <div className="back-link">
        <NavLink to={showBackToDashboard ? "/dashboard" : "/"} className="home-link">
          &larr; {showBackToDashboard ? "Back to Dashboard" : "Back to Home"}
        </NavLink>
      </div>

      {/* Members Section */}
      <div className="sidebar-section members-section">
        <h3>Members</h3>
        <div className="members-list">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnN8fDB8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200"
            alt="Member 1"
            className="member-avatar"
          />
          <img
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDU4fHxmbG93ZXJzfHx8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200"
            alt="Member 2"
            className="member-avatar"
          />
          <button className="invite-button">+Invite</button>
        </div>
      </div>

      {/* Connected Boards Section */}
      {filters && (
        <div className="sidebar-section">
          <h3>Connected boards</h3>
          {Object.keys(filters).map((category) => (
            <div className="board-toggle" key={category}>
              <input
                type="checkbox"
                checked={filters[category]}
                onChange={() => onFilterChange(category)}
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Button - only show on Dashboard */}
      {showCreateTaskButton && (
        <div className="create-task-container">
          <NavLink to="/create-task" className="create-task-button">
            Create Task
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
