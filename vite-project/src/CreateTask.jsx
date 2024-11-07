// CreateTask.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTask.css";

const CreateTask = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    category: "Product",
    assignee: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);
    navigate("/dashboard"); // Redirect to Dashboard after adding the task
  };

  return (
    <div >
      <form className="create-task-form" onSubmit={handleSubmit}>
        <h2>Create New Task</h2>
        
        <label>Task Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select name="category" value={task.category} onChange={handleChange}>
          <option value="Product">Product</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
        </select>

        <label>Assignee</label>
        <input
          type="text"
          name="assignee"
          value={task.assignee}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Backlog">Backlog</option>
        </select>

        <label>Priority</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
