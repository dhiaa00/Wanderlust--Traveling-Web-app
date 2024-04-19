import React, { useState } from "react";
import "./editTour.css";
import Modal from "react-modal";

const EditTour = ({ editButtonClicked }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Tour Modal">
        {/* Your edit tour form goes here */}
        <h2>Edit Tour</h2>
        {/* Add your form fields and logic here */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default EditTour;
