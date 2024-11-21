// TaskDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSlug } from "./utils/utils";
import Tooltip from "./Tooltip"; // Import Tooltip component
import "./TaskDetails.css";

const TaskDetails = ({ kanbanList, filters, onDeleteTask, singleTaskView, onUpdateTask, resetToggle, onReset }) => {
  const { taskTitle } = useParams();

  // State to manage the filtered tasks
  const [filteredTasks, setFilteredTasks] = useState([]);

  // State to manage editing mode for a specific task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({});

  // State to hold the initial kanban list for reset purposes
  const [initialKanbanList, setInitialKanbanList] = useState([]);

  useEffect(() => {
    if (initialKanbanList.length === 0) {
      setInitialKanbanList(kanbanList); // Set initial list on first load
    }
  }, [kanbanList]);

  // Update the filtered tasks whenever `kanbanList`, `filters`, `resetToggle`, or `taskTitle` changes
  useEffect(() => {
    let updatedFilteredTasks;
    if (singleTaskView && taskTitle) {
      updatedFilteredTasks = kanbanList.filter((task) => createSlug(task.title) === taskTitle);
    } else {
      updatedFilteredTasks = kanbanList.filter((task) => filters[task.category]);
    }
    setFilteredTasks(updatedFilteredTasks);
  }, [kanbanList, filters, taskTitle, singleTaskView, resetToggle]); // Added resetToggle dependency

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  // Handle save after editing
  const handleSave = () => {
    if (onUpdateTask && editTask.id) {
      onUpdateTask(editTask);
      setEditingTaskId(null); // Exit edit mode
    }
  };

  // Handle reset button
  const handleReset = () => {
    setFilteredTasks(initialKanbanList);
    if (onReset) {
      onReset(); // Trigger any reset actions from parent
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTask(task);
  };

  return (
    <div className="task-details-content">
      {/* Tooltip message */}
      <Tooltip
        message={
          <div>
            <strong>Welcome to Task Details Page</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>
                <strong>View tasks:</strong> View detailed information for each task, including title, assignee, status,
                priority, due date, and description.
              </li>
              <li>
                <strong>Edit tasks:</strong> Click the "Edit" button to modify task details. Save changes to update the
                task.
              </li>
              <li>
                <strong>Delete tasks:</strong> Use the "Delete" button to remove tasks from the list.
              </li>
              <li>
                <strong>Reset data:</strong> Click the "Reset" button to bring back filtered or deleted tasks to the
                default view.
              </li>
            </ul>
          </div>
        }
      />

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              {!singleTaskView && (
                <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
                  ✖
                </button>
              )}

              {editingTaskId === task.id ? (
                <div className="edit-mode">
                  <label>
                    Title:
                    <input
                      type="text"
                      name="title"
                      value={editTask.title || ""}
                      onChange={handleInputChange}
                      placeholder="Title"
                    />
                  </label>
                  <label>
                    Assignee:
                    <input
                      type="text"
                      name="assignee"
                      value={editTask.assignee || ""}
                      onChange={handleInputChange}
                      placeholder="Assignee"
                    />
                  </label>
                  <label>
                    Status:
                    <select name="status" value={editTask.status || "Backlog"} onChange={handleInputChange}>
                      <option value="Backlog">Backlog</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </label>
                  <label>
                    Priority:
                    <select name="priority" value={editTask.priority || "Medium"} onChange={handleInputChange}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </label>
                  <label>
                    DueDate:
                    <input type="date" name="dueDate" value={editTask.dueDate || ""} onChange={handleInputChange} />
                  </label>
                  <label>
                    Category:
                    <select name="category" value={editTask.category || "Product"} onChange={handleInputChange}>
                      <option value="Product">Product</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={editTask.description || ""}
                      onChange={handleInputChange}
                      placeholder="Description"
                      rows="4"
                      className="description-textarea"
                    />
                  </label>
                  <button onClick={handleSave} className="save-button">
                    Save
                  </button>
                  <button onClick={() => setEditingTaskId(null)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p>
                    <strong>Assignee:</strong> {task.assignee}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {task.dueDate}
                  </p>
                  <p>
                    <strong>Category:</strong> {task.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {task.description}
                  </p>
                  <button onClick={() => handleEditClick(task)} className="edit-button">
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-tasks-placeholder">No tasks available</p>
        )}
      </div>
      <button onClick={handleReset} className="reset-button">
        Reset Data
      </button>
    </div>
  );
};

export default TaskDetails;
