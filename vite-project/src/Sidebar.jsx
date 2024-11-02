// Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ filters, onFilterChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Members</h3>
        <div className="members-list">
          <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZsb3dlcnN8fDB8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Member 1" className="member-avatar" />
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDU4fHxmbG93ZXJzfHx8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Member 2" className="member-avatar" />
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDU4fHxmbG93ZXJzfHx8fHx8MTY5ODc4NTA5OQ&ixlib=rb-1.2.1&q=80&w=200" alt="Member 2" className="member-avatar" />
          <button className="invite-button">+Invite</button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Connected boards</h3>
        <div className="board-toggle">
          <input 
            type="checkbox" 
            checked={filters.Product} 
            onChange={() => onFilterChange("Product")} 
          />
          <label>Product</label>
        </div>
        <div className="board-toggle">
          <input 
            type="checkbox" 
            checked={filters.Desktop} 
            onChange={() => onFilterChange("Desktop")} 
          />
          <label>Desktop</label>
        </div>
        <div className="board-toggle">
          <input 
            type="checkbox" 
            checked={filters.Mobile} 
            onChange={() => onFilterChange("Mobile")} 
          />
          <label>Mobile</label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
