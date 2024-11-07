// src/utils/localStorage.js

// Function to load tasks from local storage
export const loadTasks = () => {
    const tasks = localStorage.getItem("kanbanTasks");
    return tasks ? JSON.parse(tasks) : null;
  };
  
  // Function to save tasks to local storage
  export const saveTasks = (tasks) => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  };
  