// Kanban.jsx
import React, { useState } from "react";
import KanbanListData from "../kanban.json";

function Kanban({ filters }) {
  const [kanbanList] = useState(KanbanListData);

  // Filter tasks based on both status and active filters
  const filterTasks = (status) =>
    kanbanList.filter(
      (task) => task.status === status && filters[task.category]
    );

  return (
    <div className="kanban-board">
      {["To Do", "In Progress", "Done"].map((status) => (
        <div key={status} className="kanban-column">
          <h2>{status}</h2>
          <ul>
            {filterTasks(status).length > 0 ? (
              filterTasks(status).map((task) => (
                <li key={task.id} className="kanban-item">
                  <h3>{task.title}</h3>
                  <p><strong>Assignee:</strong> {task.assignee}</p>
                  <p><strong>Status:</strong> {task.status} {task.status === "Done" ? "✅" : "❌"}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Due:</strong> {task.dueDate}</p>
                </li>
              ))
            ) : (
              <p className="no-tasks-placeholder">No tasks available</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Kanban;
