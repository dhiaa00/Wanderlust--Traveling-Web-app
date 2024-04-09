import React from "react";
import "./chevronButton.css";
import chevronDown from "/src/SVGs/chevron-down.svg";

const ChevronButton = ({ title }) => {
  return (
    <button className="chevron-button">
      {title} <img src={chevronDown} alt="chevronDown" />
    </button>
  );
};

export default ChevronButton;
