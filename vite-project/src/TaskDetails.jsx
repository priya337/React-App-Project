// TaskDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createSlug } from "./utils/utils";
import "./TaskDetails.css";

const TaskDetails = ({ kanbanList, filters, onDeleteTask, singleTaskView, onUpdateTask }) => {
  const { taskTitle } = useParams();

  // Filter tasks based on the slug
  let filteredTasks;
  if (singleTaskView && taskTitle) {
    filteredTasks = kanbanList.filter((task) => createSlug(task.title) === taskTitle);
  } else {
    filteredTasks = kanbanList.filter((task) => filters[task.category]);
  }

  // State to manage editing mode for a specific task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({});

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  // Handle save after editing
  const handleSave = () => {
    if (onUpdateTask && editTask.id) {  // Ensure onUpdateTask is defined and task has an id
      onUpdateTask(editTask);           // Call the update function with the updated task
      setEditingTaskId(null);           // Exit edit mode
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTask(task);                   // Set task to be edited
  };

  return (
    <div className="task-details-content">
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              {!singleTaskView && (
                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  ✖
                </button>
              )}

              {/* Toggle between view and edit mode based on editingTaskId */}
              {editingTaskId === task.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editTask.title || ""}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="assignee"
                    value={editTask.assignee || ""}
                    onChange={handleInputChange}
                    placeholder="Assignee"
                  />
                  <select
                    name="status"
                    value={editTask.status || "Backlog"}
                    onChange={handleInputChange}
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <select
                    name="priority"
                    value={editTask.priority || "Medium"}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <input
                    type="date"
                    name="dueDate"
                    value={editTask.dueDate || ""}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description"
                    value={editTask.description || ""}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                  <button onClick={handleSave} className="save-button">Save</button>
                  <button onClick={() => setEditingTaskId(null)} className="cancel-button">Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p><strong>Assignee:</strong> {task.assignee}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Due Date:</strong> {task.dueDate}</p>
                  <p><strong>Category:</strong> {task.category}</p>
                  <p><strong>Description:</strong> {task.description}</p>
                  <button onClick={() => handleEditClick(task)} className="edit-button">Edit</button>
                </div>
              )}
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
