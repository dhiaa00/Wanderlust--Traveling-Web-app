import React, { useState } from "react";
import "./createTourStepOne.css";
import CheckboxList from "./CheckboxList";
import { tripCategoryOptions } from "../../../data/data";
import ImportButton from "./buttons/ImportButton";
import ImageUpload from "./buttons/ImportButton"; // Import ImageUpload component

const CreateTourStepOne = ({
  step,
  prevStep,
  nextStep,
  handleInputChange,
  handleCheckboxChange,
  // Add this prop to receive uploaded image public ID
  onImageUploadSuccess,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null); // Track uploaded image public ID

  return (
    <div className="create-tour-step">
      <div className="post-background">
        <h2>Post Background</h2>
        {/* Image Upload for Background */}
        <ImageUpload onUploadSuccess={onImageUploadSuccess} />
      </div>
      <div className="post-description-details">
        <div className="post-description">
          <label htmlFor="post-title">Post Title</label>
          <input
            name="title"
            type="text"
            placeholder="Add a Tittle to Your Post"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="post-title">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter the Price of the Trip in DZD"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="post-title">Description of The Trip</label>
          <input
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
          <button onClick={nextStep}>Next Step</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTourStepOne;
