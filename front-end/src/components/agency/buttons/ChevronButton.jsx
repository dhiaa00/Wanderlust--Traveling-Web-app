import React from "react";
import "./chevronButton.css";
import chevronDown from "/src/SVGs/chevron-down.svg";
import { useNavigate } from "react-router-dom";

const ChevronButton = ({ title }) => {
  const navigate = useNavigate();
  const pathToNavigate =
    title === "My Offers" ? "/agency/1/tours" : "/agency/1/clients";
  const handleButtonClicked = () => {
    navigate(pathToNavigate);
  };
  return (
    <button className="chevron-button" onClick={handleButtonClicked}>
      {title} <img src={chevronDown} alt="chevronDown" />
    </button>
  );
};

export default ChevronButton;
