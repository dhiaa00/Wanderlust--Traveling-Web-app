import React, { useState } from "react";
import editPostIcon from "/src/SVGs/edit-post-svg.svg";
import "./createTourButton.css";

const EditTourButton = ({ editTourOpen, setEditTourOpen }) => {
  return (
    <button
      className="create-tour-button edit-tour-button"
      onClick={() => setEditTourOpen(!editTourOpen)}>
      Edit
    </button>
  );
};

export default EditTourButton;
