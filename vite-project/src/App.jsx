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
import EditTask from "./EditTask";

const App = () => {
  const navigate = useNavigate();

  const originalTaskIds = KanbanListData.map(task => task.id); // IDs of original tasks from JSON

  // Fetch initial kanban list from localStorage or fallback to KanbanListData
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

  // Function to handle adding a new task and navigating to the dashboard
  const handleAddTask = (newTask) => {
    setKanbanList((prevList) => [...prevList, { ...newTask, id: Date.now() }]);
    navigate("/dashboard");
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    setKanbanList((prevList) => prevList.filter((task) => task.id !== taskId));
  };

  // Function to toggle filters
  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  // Function to handle resetting to the original data, while retaining added tasks
  const handleReset = () => {
    const resetList = kanbanList.filter(task => !originalTaskIds.includes(task.id));
    const updatedList = [...resetList, ...KanbanListData];
    setKanbanList(updatedList);
    localStorage.setItem("kanbanList", JSON.stringify(updatedList));

    setFilters({ Product: true, Desktop: true, Mobile: true });
    localStorage.setItem("filters", JSON.stringify({ Product: true, Desktop: true, Mobile: true }));
  };

  // Function to handle task updates (edit functionality)
  const handleEditTask = (updatedTask) => {
    setKanbanList((prevList) =>
      prevList.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
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

          {/* Task Details Page for Viewing All Tasks */}
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
                  onUpdateTask={handleEditTask} // Add onUpdateTask prop for editing
                />
              </div>
            }
          />

          {/* Task Details Page for Viewing a Specific Task */}
          <Route
            path="/task-details/:taskTitle"
            element={
              <div className="task-details-container">
                <Sidebar showBackToDashboard={true} showResetButton={false} />
                <TaskDetails
                  kanbanList={kanbanList}
                  onDeleteTask={handleDeleteTask}
                  singleTaskView={true}
                  onUpdateTask={handleEditTask} // Add onUpdateTask prop for editing
                />
              </div>
            }
          />

          {/* Create Task Page */}
          <Route path="/create-task" element={<CreateTask onAddTask={handleAddTask} />} />

          {/* Edit Task Page */}
          <Route path="/edit-task/:taskId" element={<EditTask onSave={handleEditTask} />} />
        </Routes>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;