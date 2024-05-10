import React, { useRef, useState } from "react";
import "./createTourStepOne.css";
import ImportButton from "./buttons/ImportButton";

const CreateTourStepTwo = ({
  step,
  prevStep,
  nextStep,
  closeModal,
  handleInputChange,
  setFileIsUploading,
}) => {
  const [visibility, setVisibility] = useState("public");
  const selectVisibility = useRef();

  const handleVisibilityChange = () => {
    setVisibility(selectVisibility.current.value);
  };
  return (
    <div className="create-tour-step">
      <div className="post-background post-background-step-two">
        <h2>Intro</h2>
        <ImportButton
          text="Import Video"
          name="videoUrl"
          type="video"
          handleInputChange={handleInputChange}
          setFileIsUploading={setFileIsUploading}
        />
        <h2>Post Pictures</h2>
        <ImportButton
          text={"Import Images"}
          name="otherImagesUrl"
          type="image"
          handleInputChange={handleInputChange}
          setFileIsUploading={setFileIsUploading}
        />
      </div>
      <div className="post-description-details post-description-details-step-two">
        <div className="post-description">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={handleInputChange}
          />
        </div>

        <div className="post-description">
          <label htmlFor="placeFrom">City of Depart</label>
          <input
            id="placeFrom"
            name="placeFrom"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="placeTo">City of Arrive</label>
          <input
            id="placeTo"
            name="placeTo"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="visibility">Visibility</label>
          <p className="visibility-paragraph">
            {visibility === "public"
              ? "This tour will be visible to everyone."
              : "This tour will be visible to only you."}
          </p>
          <select
            name="visibility"
            id="visibility"
            value={visibility}
            ref={selectVisibility}
            onChange={(event) => {
              handleVisibilityChange();
              handleInputChange(event);
            }}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="post-description">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            onChange={handleInputChange}
          />
        </div>
        <div className="post-description">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            onChange={handleInputChange}
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

export default CreateTourStepTwo;
