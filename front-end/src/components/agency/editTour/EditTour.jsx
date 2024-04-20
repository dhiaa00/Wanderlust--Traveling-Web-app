import React, { useState } from "react";
import "./editTour.css";
import Modal from "react-modal";
import iIcon from "/src/SVGs/edit-tour-i-icon.svg";

const EditTour = () => {
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
        <div className="edit-tour-container">
          <div className="edit-tour-upper-section">
            <h2>Edit</h2>
          </div>
          <div className="edit-tour-middle-section">
            <div className="tour-infos tour-section">
              <div className="tour-info">
                <label htmlFor="tour-name">Tour Name</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Name" className="nameInput" />
                </div>
              </div>
              <div className="tour-info">
                <label htmlFor="tour-date">Date</label>
                <div className="double-input">
                  <input type="date" placeholder="Start" />
                  <input type="date" placeholder="End" />
                </div>
              </div>
              <div className="tour-info">
                <label htmlFor="tour-time">Time</label>
                <div className="double-input">
                  <input type="time" placeholder="Start" />
                  <input type="time" placeholder="End" />
                </div>
              </div>
              <div className="tour-info">
                <label htmlFor="tour-location">Location</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Location" />
                </div>
              </div>
              <div className="tour-info">
                <label htmlFor="tour-place">Place</label>
                <div className="double-input">
                  <div className="input-wrapper">
                    <input type="text" placeholder="From" />
                  </div>
                  <div className="input-wrapper">
                    <input type="text" placeholder="To" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-description tour-section">
              <img src={iIcon} alt="description" />
              <textarea
                className="tour-description"
                placeholder="About the tour"
                cols="30"
                rows="10"></textarea>
            </div>
          </div>
          <div className="edit-tour-bottom-section">
            <button onClick={closeModal} className="cancel-edit-button">
              Cancel
            </button>
            <button onClick={closeModal}>Apply</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditTour;
