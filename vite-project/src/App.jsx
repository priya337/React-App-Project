// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Kanban from "./Kanban";
import TaskDetails from "./TaskDetails";
import Navbar from "./components/Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Homepage from "./Homepage";
import About from "./About";
import CreateTask from "./CreateTask";
import "./App.css";
import KanbanListData from "../kanban.json"; // Ensure this path is correct
import { NotFound } from "./components/NotFound.jsx";

const App = () => {
  const navigate = useNavigate();

  const originalTaskIds = KanbanListData.map(task => task.id); // IDs of original tasks from JSON

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

  const handleAddTask = (newTask) => {
    setKanbanList((prevList) => [...prevList, { ...newTask, id: Date.now() }]);
    navigate("/dashboard");
  };

  const handleDeleteTask = (taskId) => {
    setKanbanList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleReset = () => {
    // Filter out any tasks that are not in the original set of IDs
    const resetList = kanbanList.filter(task => !originalTaskIds.includes(task.id));
  
    // Update state and local storage to keep only new tasks, while restoring original tasks
    const updatedList = [...resetList, ...KanbanListData];
    setKanbanList(updatedList);
    localStorage.setItem("kanbanList", JSON.stringify(updatedList));
  
    // Reset filters as before
    setFilters({ Product: true, Desktop: true, Mobile: true });
    localStorage.setItem("filters", JSON.stringify({ Product: true, Desktop: true, Mobile: true }));
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
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
                  showTaskDetailsLink={true}
                  showResetButton={true}
                  onReset={handleReset}
                />
                <Kanban
                  kanbanList={kanbanList}
                  filters={filters}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTaskStatus={(taskId, newStatus) => {
                    setKanbanList((prevList) =>
                      prevList.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                      )
                    );
                  }}
                />
              </div>
            }
          />

          <Route
            path="/task-details"
            element={
              <div className="task-details-container">
                <Sidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  showBackToDashboard={true}
                  showResetButton={true}
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

          <Route
            path="/task-details/:taskTitle"
            element={
              <div className="task-details-container">
                <Sidebar showBackToDashboard={true} showResetButton={false} />
                <TaskDetails
                  kanbanList={kanbanList}
                  onDeleteTask={handleDeleteTask}
                  singleTaskView={true}
                />
              </div>
            }
          />

          <Route
            path="/create-task"
            element={<CreateTask onAddTask={handleAddTask} />}
          />
        </Routes>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
