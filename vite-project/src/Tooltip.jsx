// Tooltip.jsx
import React, { useEffect, useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the tooltip after 5 minutes
    const timer = setTimeout(() => {
      setVisible(false);
    }, 300000); // 300,000 ms = 5 minutes

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="tooltip-container">
      {/* Check if message is a string or JSX; if string, wrap in <p> */}
      {typeof message === "string" ? <p>{message}</p> : message}
    </div>
  );
};

export default Tooltip;
