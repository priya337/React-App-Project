// KanbanBoard.jsx
import React from 'react';
import './SidebarKanban.css';

const KanbanBoard = () => {
  // Static task data categorized by status
  const tasks = [
    { id: "1", title: "Design Landing Page", status: "Backlog", priority: "High" },
    { id: "2", title: "Develop User Registration", status: "To-Do", priority: "Medium" },
    { id: "3", title: "Bug Fix: Login Issue", status: "In Progress", priority: "High" },
    { id: "4", title: "Release Version 1.0", status: "Waiting", priority: "High" },
    { id: "5", title: "Update Documentation", status: "Completed", priority: "Low" },
  ];

  // Group tasks by status
  const groupedTasks = {
    "Backlog": tasks.filter(task => task.status === "Backlog"),
    "To-Do": tasks.filter(task => task.status === "To-Do"),
    "In Progress": tasks.filter(task => task.status === "In Progress"),
    "Waiting": tasks.filter(task => task.status === "Waiting"),
    "Completed": tasks.filter(task => task.status === "Completed"),
  };

  return (
    <div className="kanban-board-container">
      <div className="kanban-board">
        {Object.keys(groupedTasks).map(status => (
          <div key={status} className={`kanban-column ${status.replace(" ", "-").toLowerCase()}`}>
            <h3>{status}</h3>
            <ul>
              {groupedTasks[status].map(task => (
                <li key={task.id} className="task-item">
                  <h4>{task.title}</h4>
                  <p><strong>Priority:</strong> {task.priority}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
