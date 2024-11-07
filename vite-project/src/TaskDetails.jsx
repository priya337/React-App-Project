// TaskDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { formatTitleForUrl } from "./utils/utils.js"; // Import the utility function
import "./TaskDetails.css";

const TaskDetails = ({ kanbanList, filters, onDeleteTask, singleTaskView }) => {
  const { taskTitle } = useParams();

  // Determine which tasks to display
  let filteredTasks;

  if (singleTaskView && taskTitle) {
    // Display a single task based on URL parameter (taskTitle), using formatted title
    filteredTasks = kanbanList.filter(
      (task) => formatTitleForUrl(task.title) === taskTitle
    );
  } else {
    // Display all tasks that match the filters
    filteredTasks = kanbanList.filter((task) => filters[task.category]);
  }

  return (
    <div className="task-details-content">
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              {/* Conditionally render the delete button only in full task view */}
              {!singleTaskView && (
                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  ✖
                </button>
              )}
              <h3>{task.title}</h3>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Category:</strong> {task.category}</p>
              <p><strong>Description:</strong> {task.description}</p>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
