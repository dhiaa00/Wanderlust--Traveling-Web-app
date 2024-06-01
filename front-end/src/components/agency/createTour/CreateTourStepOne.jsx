import React, { useState } from "react";
import "./createTourStepOne.css";
import CheckboxList from "./CheckboxList";
import { tripCategoryOptions } from "../../../data/data";
import ImageUpload from "./buttons/ImportButton"; // Import ImageUpload component

const CreateTourStepOne = ({
  step,
  prevStep,
  nextStep,
  handleInputChange,
  handleCheckboxChange,
  fileIsUploading,
  setFileIsUploading,
  formData,
}) => {
  return (
    <div className="create-tour-step">
      <div className="post-background">
        <h2>Post Background</h2>
        {/* Image Upload for Background */}
        <ImageUpload
          text="Upload Main Image"
          name="thumbImageUrl"
          type="image"
          handleInputChange={handleInputChange}
          setFileIsUploading={setFileIsUploading}
        />
        {!fileIsUploading &&
          FormData.thumbImageUrl !== "" &&
          formData.thumbImageUrl !== undefined && (
            <img
              style={{ width: "100px", margin: "10px" }}
              src={`${formData.thumbImageUrl}`}
              alt="no uploaded images"
            />
          )}
      </div>
      <div className="post-description-details">
        <div className="post-description">
          <label htmlFor="post-title">Post Title</label>
          <input
            id="post-title"
            name="title"
            type="text"
            placeholder="Add a Tittle to Your Post"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="price-input">Price</label>
          <input
            id="price-input"
            name="price"
            type="number"
            placeholder="Enter the Price of the Trip in DZD"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="description-input">Description of The Trip</label>
          <input
            id="description-input"
            name="description"
            type="text"
            placeholder="100 Words at least"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <h2>Classify your Project</h2>
          <CheckboxList
            options={tripCategoryOptions}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="step-navigation">
          <button disabled={step === 1} onClick={prevStep}>
            Back
          </button>
          <button onClick={nextStep}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTourStepOne;
