import React from "react";
import "./createTourStepOne.css";
import ImportButton from "./buttons/ImportButton";

const CreateTourStepTwo = ({ step, prevStep, nextStep }) => {
  return (
    <div className="create-tour-step">
      <div className="post-background">
        <h2>Intro</h2>
        <ImportButton text="Import Video" type="video" />
        <h2>Post Pictures</h2>
        <ImportButton text={"Import Images"} />
      </div>
      <div className="post-description-details">
        <div className="post-description">
          <label htmlFor="visibility">Visibility</label>
          <select name="visibility" id="visibility">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
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

export default CreateTourStepTwo;
