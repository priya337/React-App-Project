import React, { useState } from "react";
import KanbanListData from "../kanban.json";
import Sidebar from "./Sidebar"; // Import Sidebar here
import "./kanban.css";

function Kanban() {
  const [kanbanList, setKanbanList] = useState(KanbanListData);

  // Set initial filter state for categories
  const [filters, setFilters] = useState({
    Product: true,
    Desktop: true,
    Mobile: true,
  });

  // Handle filter change from Sidebar checkboxes
  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  // Filter tasks based on both status and active filters
  const filterTasks = (status) =>
    kanbanList.filter(
      (task) => task.status === status && filters[task.category]
    );

  // Delete task function with automatic uncheck logic
  const deleteTask = (id) => {
    setKanbanList((prevList) => {
      const updatedList = prevList.filter((task) => task.id !== id);

      // Check if any category now has no tasks left, and uncheck its filter if so
      const categories = ["Product", "Desktop", "Mobile"];
      const updatedFilters = { ...filters };

      categories.forEach((category) => {
        // If there are no tasks left for this category, uncheck it
        if (!updatedList.some((task) => task.category === category)) {
          updatedFilters[category] = false;
        }
      });

      // Update filters if any category was unchecked
      setFilters(updatedFilters);

      return updatedList;
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} /> {/* Render Sidebar here */}
      <div className="kanban-board">
        {["To Do", "In Progress", "Done"].map((status) => {
          const filteredTasks = filterTasks(status);
          return (
            <div key={status} className="kanban-column">
              <h2>{status}</h2>
              <ul className="kanban-task-list">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <li key={task.id} className="kanban-item">
                      <button
                        className="delete-button"
                        onClick={() => deleteTask(task.id)}
                      >
                        ✖
                      </button>
                      <h3>{task.title}</h3>
                      <p><strong>Assignee:</strong> {task.assignee}</p>
                      <p><strong>Status:</strong> {task.status} {task.status === "Done" ? "✅" : ""}</p>
                      <p><strong>Priority:</strong> {task.priority}</p>
                      <p><strong>Due:</strong> {task.dueDate}</p>
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
    </div>
  );
}

export default Kanban;
