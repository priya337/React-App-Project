// Kanban.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import "./kanban.css";
import { createSlug } from "./utils/utils";

function Kanban({ kanbanList, filters, onDeleteTask, onUpdateTaskStatus }) {
  const navigate = useNavigate();

  const filterTasks = (status) =>
    kanbanList.filter((task) => task.status === status && filters[task.category]);

    const handleCardClick = (task) => {
      const slug = createSlug(task.title);
      navigate(`/task-details/${slug}`, { state: { task } });
    };
    

  return (
    <div className="kanban-board">
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

function Card({ task, onClick, onDelete }) {
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
          e.stopPropagation();
          onDelete(task.id);
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
  );
}

export default Kanban;
