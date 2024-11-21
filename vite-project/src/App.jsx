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

  // Fetch initial kanban list from localStorage or fallback to KanbanListData
  const getInitialKanbanList = () => {
    const savedTasks = localStorage.getItem("kanbanList");
    return savedTasks ? JSON.parse(savedTasks) : KanbanListData;
  };

  const [initialKanbanList, setInitialKanbanList] = useState(getInitialKanbanList());
  const [kanbanList, setKanbanList] = useState(getInitialKanbanList);
  const [filters, setFilters] = useState({
    Product: true,
    Desktop: true,
    Mobile: true,
  });
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);
  const [resetToggle, setResetToggle] = useState(false); // Toggle to force re-render after reset

  // Save kanban list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kanbanList", JSON.stringify(kanbanList));
  }, [kanbanList]);

  // Add a new task and navigate to the dashboard
  const handleAddTask = (newTask) => {
    const updatedList = [...kanbanList, { ...newTask, id: Date.now() }];
    setKanbanList(updatedList);
    setInitialKanbanList(updatedList); // Update the initial list to include the new task
    navigate("/dashboard");
  };

  // Delete a task by ID and track it in deletedTaskIds
  const handleDeleteTask = (taskId) => {
    const updatedList = kanbanList.filter((task) => task.id !== taskId);
    setKanbanList(updatedList);

    // Track the deleted task ID
    const updatedDeletedTaskIds = [...deletedTaskIds, taskId];
    setDeletedTaskIds(updatedDeletedTaskIds);
  };

  // Toggle filters for task categories
  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleReset = () => {
    // Reset kanban list to the original initial list
    setKanbanList(initialKanbanList);
    setDeletedTaskIds([]); // Clear deleted task IDs
    setFilters({ Product: true, Desktop: true, Mobile: true }); // Reset filters to default values
    setResetToggle((prev) => !prev); // Toggle resetToggle to force re-rendering
  };

  // Update a task (edit functionality)
  const handleEditTask = (updatedTask) => {
    const updatedList = kanbanList.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setKanbanList(updatedList);
    setInitialKanbanList(updatedList); // Update the initial list with the edited task
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
                  onReset={handleReset} // Independent reset for Sidebar
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
                    setInitialKanbanList((prevList) =>
                      prevList.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                      )
                    );
                  }}
                  resetToggle={resetToggle} // Pass resetToggle to force re-render
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
                  onReset={handleReset} // Independent reset for Sidebar
                />
                <TaskDetails
                  kanbanList={kanbanList}
                  filters={filters}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleEditTask} // Editing functionality
                  resetToggle={resetToggle} // Pass resetToggle to force re-render
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
                  onUpdateTask={handleEditTask} // Editing functionality
                  resetToggle={resetToggle} // Pass resetToggle to force re-render
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
