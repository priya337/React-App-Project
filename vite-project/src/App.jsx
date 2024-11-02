// App.jsx
import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Kanban from "./Kanban.jsx";

const App = () => {
  // Define filters state here to share it between Sidebar and Kanban
  const [filters, setFilters] = useState({
    Product: true,
    Desktop: true,
    Mobile: true,
  });

  // Update filters when checkboxes are toggled in Sidebar
  const handleFilterChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  return (
    <div className="app-container">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      {<Navbar />}
      <div className="main-content">
        <div className="kanban-container">
          <Kanban filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
