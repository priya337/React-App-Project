// EditTask.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./EditTask.css"; // Assuming you have a CSS file for EditTask-specific styles

const EditTask = ({ onSave }) => {
  const { taskId } = useParams(); // Retrieve task ID from the route parameter
  const location = useLocation(); // Access state passed from navigation
  const navigate = useNavigate();

  // Retrieve the task either from route state or props, or initialize as undefined
  const taskFromState = location.state?.task;
  const [task, setTask] = useState(taskFromState || null);

  useEffect(() => {
    if (!taskFromState && taskId) {
      // In case the task was not passed in state, find it by ID
      const savedTasks = JSON.parse(localStorage.getItem("kanbanList") || "[]");
      const foundTask = savedTasks.find((t) => t.id === parseInt(taskId));
      setTask(foundTask || null);
    }
  }, [taskFromState, taskId]);

  // Initialize state for form fields based on the task object
  const [title, setTitle] = useState(task?.title || "");
  const [category, setCategory] = useState(task?.category || "Product");
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [status, setStatus] = useState(task?.status || "To Do");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [description, setDescription] = useState(task?.description || "");

  // Update form fields if task data changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setAssignee(task.assignee);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title,
      category,
      assignee,
      status,
      priority,
      dueDate,
      description,
    };
    onSave(updatedTask); // Call the onSave function to save the task
    navigate("/dashboard"); // Redirect to Dashboard
  };

  // Display a loading message if the task has not yet been retrieved
  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <div className="edit-task-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Product">Product</option>
            <option value="Desktop">Desktop</option>
            <option value="Mobile">Mobile</option>
          </select>
        </label>
        <label>
          Assignee:
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Backlog">Backlog</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
    </div>
  );
};

export default EditTask;
