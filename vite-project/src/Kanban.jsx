// Kanban.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import "./kanban.css";
import { createSlug } from "./utils/utils";
import Tooltip from "./Tooltip";

function Kanban({ kanbanList, filters, onDeleteTask, onUpdateTaskStatus, resetToggle }) {
  const navigate = useNavigate();
  const [filteredKanbanList, setFilteredKanbanList] = useState(kanbanList);

  // Update the filteredKanbanList whenever kanbanList, filters, or resetToggle changes
  useEffect(() => {
    const updatedFilteredKanbanList = kanbanList.filter((task) => filters[task.category]);
    setFilteredKanbanList(updatedFilteredKanbanList);
  }, [kanbanList, filters, resetToggle]); // Added resetToggle dependency

  // Filter tasks based on status and category
  const filterTasks = (status) =>
    filteredKanbanList.filter((task) => task.status === status);

  // Navigate to the task details or edit page when a card is clicked
  const handleCardClick = (task) => {
    const slug = createSlug(task.title);
    navigate(`/task-details/${slug}`, { state: { task } });
  };

  // Navigate to the edit task page
  const handleEditTask = (task) => {
    navigate(`/edit-task/${task.id}`, { state: { task } });
  };

  return (
    <div className="kanban-board">
      {/* Tooltip component here to show only once at the bottom right */}
      <Tooltip message={<div>
        <h3>Welcome to the Dashboard</h3>
        <ul>
          <li><strong>View tasks:</strong> View and manage tasks organized into different columns based on their status.</li>
          <li><strong>Drag and drop:</strong> Move tasks between columns to update their status easily by dragging and dropping.</li>
          <li><strong>Create tasks:</strong> Use the "Create Task" button to add new tasks to the board.</li>
          <li><strong>Edit tasks:</strong> Click the pencil icon on a task card to modify its details.</li>
          <li><strong>Filter tasks:</strong> Use the checkboxes in the sidebar to filter tasks by category, showing only what you need.</li>
          <li><strong>Reset data:</strong> Click the "Reset Data" button to restore any filtered or deleted tasks to the default view.</li>
        </ul>
      </div>} />

      {["Backlog", "To Do", "In Progress", "Done"].map((status) => (
        <Column
          key={status}
          status={status}
          tasks={filterTasks(status)}
          onDrop={(taskId) => onUpdateTaskStatus(taskId, status)}
        >
          {filterTasks(status).map((task) => (
            <Card
              key={task.id}
              task={task}
              onClick={() => handleCardClick(task)}
              onDelete={onDeleteTask}
              onEdit={() => handleEditTask(task)}
            />
          ))}
        </Column>
      ))}
    </div>
  );
}

function Column({ status, children, onDrop }) {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => onDrop(item.id),
  });

  return (
    <div ref={drop} className="kanban-column">
      <h2>{status}</h2>
      <ul className="kanban-task-list">{children}</ul>
    </div>
  );
}

function Card({ task, onClick, onDelete, onEdit }) {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      className="kanban-item"
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering navigation
          onDelete(task.id);
        }}
      >
        ✖
      </button>
      <button
        className="edit-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click from triggering navigation
          onEdit(task);
        }}
      >
        ✎
      </button>
      <h3>{task.title}</h3>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
    </li>
  );
}

export default Kanban;
