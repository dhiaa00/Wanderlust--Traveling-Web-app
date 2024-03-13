import React from "react";
import "./mainbutton.css";

const MainButton = ({ text }) => {
  return (
    <button className="main-button">
      <p>{text}</p>
    </button>
  );
};

export default MainButton;
