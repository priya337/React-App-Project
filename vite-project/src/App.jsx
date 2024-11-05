// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Kanban from "./Kanban.jsx";
import Navbar from "./components/Navbar.jsx";
// import Sidebar from "./Sidebar"; // Import Sidebar here
import Homepage from "./Homepage.jsx";
import About from "./About.jsx";
import "./App.css";
import Footer from "./Footer.jsx";
import { NotFound } from "./components/NotFound.jsx";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <div className="dashboard-container">
              {/* <Sidebar filters={filters} onFilterChange={handleFilterChange} /> */}
              <Kanban filters={filters} />
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
