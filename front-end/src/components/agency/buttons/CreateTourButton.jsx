import React from "react";
import "./createTourButton.css";

const CreateTourButton = ({ createTour, setCreateTour }) => {
  const handleClickCreate = () => {
    setCreateTour(!createTour);
  };
  return (
    <button className="create-tour-button" onClick={handleClickCreate}>
      Create
    </button>
  );
};

export default CreateTourButton;
