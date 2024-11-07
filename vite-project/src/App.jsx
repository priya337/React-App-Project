// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import KanbanListData from "../kanban.json";
import Kanban from "./Kanban.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./Homepage.jsx";
import About from "./About.jsx";
import CreateTask from "./CreateTask";
import Sidebar from "./Sidebar";
import TaskDetails from "./TaskDetails"; // Import TaskDetails component
import "./App.css";
import Footer from "./Footer.jsx";
import { NotFound } from "./components/NotFound.jsx";

const App = () => {
  const [kanbanList, setKanbanList] = useState(KanbanListData);
  const [filters, setFilters] = useState({
    Product: true,
    Desktop: true,
    Mobile: true,
  });

  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleAddTask = (newTask) => {
    setKanbanList((prevList) => [...prevList, newTask]);
  };

  const handleDeleteTask = (id) => {
    setKanbanList((prevList) => prevList.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-container">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                showCreateTaskButton={true}
              />
              <Kanban
                filters={filters}
                kanbanList={kanbanList}
                setKanbanList={setKanbanList}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          }
        />
        <Route
          path="/create-task"
          element={
            <div className="page-layout">
              <Sidebar showBackToDashboard={true} />
              <CreateTask onAddTask={handleAddTask} />
            </div>
          }
        />
        <Route
          path="/task-details"
          element={
            <TaskDetails
              kanbanList={kanbanList}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
