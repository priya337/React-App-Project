// Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Integrations */}
      <div className="sidebar-header">
        <span>Web</span>
        <div className="icon integrations-icon"></div>
      </div>

      {/* Members */}
      <div className="sidebar-section">
        <h3>Members</h3>
        <div className="members-list">
          {/* Placeholder avatars */}
          <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnN8fDB8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Anna" className="member-avatar" />
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDU4fHxmbG93ZXJzfHx8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Mirela" className="member-avatar" />
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDU4fHxmbG93ZXJzfHx8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Priya" className="member-avatar" />
          <button className="invite-button">+Invite</button>
        </div>
      </div>

      {/* Connected Boards */}
      <div className="sidebar-section">
        <h3>Connected boards</h3>
        <div className="board-toggle">
          <input type="checkbox" checked />
          <label>Product</label>
        </div>
        <div className="board-toggle">
          <input type="checkbox" checked />
          <label>Desktop</label>
        </div>
        <div className="board-toggle">
          <input type="checkbox" />
          <label>Mobile</label>
        </div>
      </div>

      {/* Calendars */}
      <div className="sidebar-section">
        <h3>Calendars</h3>
        <div className="calendar-item">
          <span>ps@gmail.com</span>
        </div>
        <div className="calendar-toggle">
          <input type="checkbox" checked />
          <label>Events</label>
        </div>
        <div className="calendar-toggle">
          <input type="checkbox" />
          <label>Workouts</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
