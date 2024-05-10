import React from "react";
import iIcon from "/src/SVGs/edit-tour-i-icon.svg";
import ImportButton from "../createTour/buttons/ImportButton";

const EditTourStepOne = ({
  handleInputChange,
  setFileIsUploading,
  handleNextStep,
  closeModal,
}) => {
  return (
    <div className="edit-tour-container">
      <div className="edit-tour-upper-section">
        <h2>Edit</h2>
      </div>
      <div className="edit-tour-middle-section">
        <div className="tour-infos tour-section">
          <div className="tour-info">
            <label htmlFor="tour-name">Post Title</label>
            <div className="input-wrapper">
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="nameInput"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="tour-info">
            <label htmlFor="tour-date">Date</label>
            <div className="double-input">
              <input
                name="startDate"
                type="date"
                placeholder="Start"
                onChange={handleInputChange}
              />
              <input
                name="endDate"
                type="date"
                placeholder="End"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="tour-info">
            <label htmlFor="tour-location">Location</label>
            <div className="input-wrapper">
              <input
                name="country"
                type="text"
                placeholder="Location"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="tour-info">
            <label htmlFor="tour-place">Place</label>
            <div className="double-input">
              <div className="input-wrapper">
                <input
                  name="placeFrom"
                  type="text"
                  placeholder="From"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-wrapper">
                <input
                  name="placeTo"
                  type="text"
                  placeholder="To"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="tour-description tour-section">
          <div className="description">
            <img src={iIcon} alt="description" />
            <textarea
              className="tour-description"
              name="description"
              placeholder="About the tour"
              cols="30"
              rows="10"
              onChange={handleInputChange}></textarea>
          </div>
          <ImportButton
            text="Upload Main Image"
            name="thumbImageUrl"
            type="image"
            handleInputChange={handleInputChange}
            setFileIsUploading={setFileIsUploading}
          />
        </div>
      </div>
      <div className="edit-tour-bottom-section">
        <button onClick={closeModal} className="cancel-edit-button">
          Cancel
        </button>
        <button onClick={handleNextStep}>Next</button>
      </div>
    </div>
  );
};

export default EditTourStepOne;
