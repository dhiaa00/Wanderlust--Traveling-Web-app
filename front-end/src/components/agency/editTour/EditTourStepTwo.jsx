import React from "react";

const EditTourStepTwo = ({
  handleInputChange,
  handlePreviousStep,
  handleEditPost,
}) => {
  return (
    <div className="edit-tour-container edit-tour-step-two">
      <div className="edit-tour-upper-section">
        <h2>Edit</h2>
      </div>
      <div className="edit-tour-middle-section-step-two">
        <div className="tour-info">
          <label htmlFor="tour-price">Price</label>
          <div className="input-wrapper">
            <input
              id="tour-price"
              name="price"
              type="number"
              placeholder="Price"
              className="nameInput"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="tour-info">
          <label htmlFor="tour-time">Time</label>
          <div className="double-input">
            <input
              id="tour-time"
              name="flightTime"
              type="text"
              placeholder="Flight Time"
              onChange={handleInputChange}
            />
            <input
              id="tour-time"
              name="flightDuration"
              type="number"
              placeholder="Flight Duration by hours"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="edit-tour-bottom-section">
        <button onClick={handlePreviousStep} className="cancel-edit-button">
          Previous
        </button>
        <button onClick={handleEditPost}>Apply</button>
      </div>
    </div>
  );
};

export default EditTourStepTwo;
