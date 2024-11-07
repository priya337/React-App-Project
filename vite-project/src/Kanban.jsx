// Kanban.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTitleForUrl } from "./utils/utils.js"; // Import the utility function
import "./kanban.css";

function Kanban({ kanbanList, filters, onDeleteTask }) {
  const navigate = useNavigate();

  // Function to filter tasks based on their status and active filters
  const filterTasks = (status) =>
    kanbanList.filter((task) => task.status === status && filters[task.category]);

  // Function to handle navigation to the Task Details page with the task details
  const handleCardClick = (task) => {
    const urlTitle = formatTitleForUrl(task.title); // Format title for URL
    navigate(`/task-details/${urlTitle}`, { state: { task } }); // Navigate with task details in state
  };

  return (
    <div className="kanban-board">
      {["To Do", "In Progress", "Done", "Backlog"].map((status) => {
        const filteredTasks = filterTasks(status);
        return (
          <div key={status} className="kanban-column">
            <h2>{status}</h2>
            <ul className="kanban-task-list">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="kanban-item"
                    onClick={() => handleCardClick(task)} // Navigate to Task Details on click
                  >
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from triggering on delete
                        onDeleteTask(task.id);
                      }}
                    >
                      ✖
                    </button>
                    <h3>{task.title}</h3>
                    <p><strong>Assignee:</strong> {task.assignee}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Due Date:</strong> {task.dueDate}</p>
                  </li>
                ))
              ) : (
                <p className="no-tasks-placeholder">No tasks available</p>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Kanban;
