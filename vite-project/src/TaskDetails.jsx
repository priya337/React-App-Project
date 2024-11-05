// TaskDetails.jsx
import React from "react";
import Sidebar from "./Sidebar";
import "./TaskDetails.css"; // Add a CSS file specifically for Task Details page styling

const TaskDetails = ({ kanbanList, filters, onFilterChange }) => {
  // Filter tasks based on selected categories
  const filteredTasks = kanbanList.filter(
    (task) => filters[task.category]
  );

  return (
    <div className="task-details-container">
      <Sidebar filters={filters} onFilterChange={onFilterChange} showBackToDashboard={true} />

      <div className="task-details-content">
        {/* <h1>Task Details</h1> */}
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p><strong>Assignee:</strong> {task.assignee}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Category:</strong> {task.category}</p> {/* Display Category */}
                <p><strong>Description:</strong> {task.description}</p>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
