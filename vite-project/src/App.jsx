import "./App.css";
import Footer from "./Footer.jsx";
import React from "react";
import KanbanBoard from "./Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <KanbanBoard />
        <Footer />
      </div>
    </>
  );
}

export default App;
