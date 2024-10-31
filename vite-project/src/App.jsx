<<<<<<< HEAD
import "./App.css";
import "./components/Navbar";

function App() {
  return (
    <>
      <div></div>
      <div></div>
    </>
  );
}
=======
// App.jsx
import React from 'react';
import Sidebar from './Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      {/* Other main content here */}
      {/* <div className="main-content"> */}
        {/* Placeholder for the rest of the application content */}
        {/* <h1>Main Content</h1> */}
      {/* </div> */}
    </div>
  );
};
>>>>>>> 85132046ba2b0ce1dbca16ea563e7fe77724bb96

export default App;
