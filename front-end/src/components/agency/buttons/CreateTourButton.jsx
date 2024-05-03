import React from "react";
import "./createTourButton.css";

const CreateTourButton = ({ createTour, setCreateTour, setTourCreated }) => {
  const handleClickCreate = () => {
    setCreateTour(!createTour);
    setTourCreated(false);
  };
  return (
    <button className="create-tour-button" onClick={handleClickCreate}>
      Create
    </button>
  );
};

export default CreateTourButton;
