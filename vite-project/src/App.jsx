// App.jsx
<<<<<<< HEAD
import React from "react";
import KanbanBoard from "./Sidebar";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
=======
import React from 'react';
// import KanbanBoard from './Sidebar';
import './App.css';
import Sidebar from './Sidebar.jsx'
import Footer from './Footer.jsx'
import Navbar from './components/Navbar.jsx';
>>>>>>> 9b68c7a369cd74dc9ce650ae96feb96a8d69bee6

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
