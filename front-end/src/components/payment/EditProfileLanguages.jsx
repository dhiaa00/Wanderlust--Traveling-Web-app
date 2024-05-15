import React from "react";
import "./editprofilelanguage.css";

const EditProfileLanguages = () => {
  return (
    <div className="editprofile-langauge">
      <h1>Languages</h1>
      <div className="choice-of-language-container">
        <h2>Which language should our website use?</h2>
        <form>
          <div className="choices-container">
            <div className="row">
              <div className="input">
                <input
                  type="radio"
                  id="English"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="English">English</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Spanish"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Spanish">Spanish</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="German"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="German">German</label>
              </div>
            </div>
            <div className="row">
              <div className="input">
                <input
                  type="radio"
                  id="Portuguese"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Portuguese">Portuguese</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Chinese"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Chinese">Chinese</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Japanese"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Japanese">Japanese</label>
              </div>
            </div>
            <div className="row">
              <div className="input">
                <input
                  type="radio"
                  id="Arabic"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Arabic">Arabic</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Russian"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Russian">Russian</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Italian"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Italian">Italian</label>
              </div>
            </div>
            <div className="row">
              <div className="input">
                <input
                  type="radio"
                  id="Hindi"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Hindi">Hindi</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="Korean"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="Korean">Korean</label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  id="French"
                  name="language"
                  value="en"
                  className="radio-input-button"
                />
                <label htmlFor="French">French</label>
              </div>
            </div>
          </div>
          <button className="Choose-button">Choose</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileLanguages;
