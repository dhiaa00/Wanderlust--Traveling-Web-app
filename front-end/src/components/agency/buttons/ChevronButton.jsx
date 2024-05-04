import React from "react";
import "./chevronButton.css";
import chevronDown from "/src/SVGs/chevron-down.svg";
import { useNavigate, useParams } from "react-router-dom";

const ChevronButton = ({ title }) => {
  const navigate = useNavigate();
  const { agencyId } = useParams();
  const pathToNavigate =
    title === "My Offers"
      ? `/agency/${agencyId}/tours`
      : `/agency/${agencyId}/clients`;
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
