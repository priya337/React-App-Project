// App.jsx
import React from "react";
// import KanbanBoard from './Sidebar';
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Navbar />
      <Footer />
      {/* Other main content here */}
      {/* <div className="main-content"> */}
      {/* Placeholder for the rest of the application content */}
      {/* <h1>Main Content</h1> */}
      {/* </div> */}
    </div>
  );
};
export default App;
