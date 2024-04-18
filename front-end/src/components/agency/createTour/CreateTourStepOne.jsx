import React from "react";
import "./createTourStepOne.css";
import CheckboxList from "./CheckboxList";
import { tripCategoryOptions } from "../../../data/data";
import ImportButton from "./buttons/ImportButton";

const CreateTourStepOne = ({ step, prevStep, nextStep }) => {
  return (
    <div className="create-tour-step">
      <div className="post-background">
        <h2>Post Background</h2>
        <ImportButton text={"Import Image"} />
      </div>
      <div className="post-description-details">
        <div className="post-description">
          <label htmlFor="post-title">Post Title</label>
          <input type="text" placeholder="Add a Tittle to Your Post" />
        </div>
        <div className="post-description">
          <label htmlFor="post-title">Keywords of The Trip</label>
          <input
            type="text"
            placeholder="10 Keyword to Help People Find your Post"
          />
        </div>
        <div className="post-description">
          <label htmlFor="post-title">Description of The Trip</label>
          <input type="text" placeholder="100 Words at least" />
        </div>
        <div className="post-description">
          <h2>Classify your Project</h2>
          <CheckboxList options={tripCategoryOptions} />
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
