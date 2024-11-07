// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Kanban from "./Kanban";
import TaskDetails from "./TaskDetails";
import Navbar from "./components/Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Homepage from "./Homepage"
import About from "./About"
import CreateTask from "./CreateTask"
import "./App.css";
import KanbanListData from "../kanban.json"; // Make sure this path is correct
import { NotFound } from "./components/NotFound.jsx";

const App = () => {
  const navigate = useNavigate();

  // Fetch initial data from localStorage or fallback to JSON data
  const getInitialKanbanList = () => {
    const savedTasks = localStorage.getItem("kanbanList");
    return savedTasks ? JSON.parse(savedTasks) : KanbanListData;
  };

  const [kanbanList, setKanbanList] = useState(getInitialKanbanList);
  const [filters, setFilters] = useState({
    Product: true,
    Desktop: true,
    Mobile: true,
  });

  useEffect(() => {
    localStorage.setItem("kanbanList", JSON.stringify(kanbanList));
  }, [kanbanList]);

  // Adding a new task and navigating to Dashboard
  const handleAddTask = (newTask) => {
    setKanbanList((prevList) => [...prevList, { ...newTask, id: Date.now() }]);
    navigate("/dashboard"); // Navigate to Dashboard after adding the task
  };

  // Deleting a task
  const handleDeleteTask = (taskId) => {
    setKanbanList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  // Toggling filter options
  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  // Resetting to default data
  const handleReset = () => {
    localStorage.removeItem("kanbanList");
    localStorage.removeItem("filters");
    setKanbanList(KanbanListData);
    setFilters({ Product: true, Desktop: true, Mobile: true });
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-container">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                showCreateTaskButton={true}
                showTaskDetailsLink={true} // Show Task Details link on Dashboard
                showResetButton={true} // Show Reset button on Dashboard
                onReset={handleReset}
              />
              <Kanban
                kanbanList={kanbanList}
                filters={filters}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          }
        />

        {/* Task Details Page for Viewing All Tasks */}
        <Route
          path="/task-details"
          element={
            <div className="task-details-container">
              <Sidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                showBackToDashboard={true}
                showResetButton={true} // Show Reset button on Task Details page
                onReset={handleReset}
              />
              <TaskDetails
                kanbanList={kanbanList}
                filters={filters}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          }
        />

        {/* Task Details Page for Viewing a Specific Task */}
        <Route
          path="/task-details/:taskTitle" // Updated for dynamic routing
          element={
            <div className="task-details-container">
              <Sidebar
                showBackToDashboard={true} // Only show "Back to Dashboard" for specific task view
                showResetButton={false} // Hide Reset button for specific task view
              />
              <TaskDetails
                kanbanList={kanbanList}
                onDeleteTask={handleDeleteTask}
                singleTaskView={true} // Pass a prop to indicate single task view
              />
            </div>
          }
        />

        {/* Create Task Page */}
        <Route
          path="/create-task"
          element={
            // <div className="page-layout">
            //   <Sidebar showBackToDashboard={true} />
              <CreateTask onAddTask={handleAddTask} />
            // {/* </div> */}
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
