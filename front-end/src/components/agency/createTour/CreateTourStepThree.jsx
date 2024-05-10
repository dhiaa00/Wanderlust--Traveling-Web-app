import "./createTourStepOne.css";

const CreateTourStepThree = ({
  step,
  prevStep,
  closeModal,
  handleInputChange,
  handleCreateSubmit,
}) => {
  return (
    <div className="create-tour-step">
      <div className="post-description-details post-description-details-step-three">
        <div className="details-container">
          <div className="post-description">
            <label htmlFor="flightTime">Flight Time</label>
            <input
              id="flightTime"
              name="flightTime"
              type="text"
              placeholder="Enter the Time of the Flight (example: 12:00)"
              onChange={handleInputChange}
            />
          </div>
          <div className="post-description">
            <label htmlFor="flightDuration">Flight Duration</label>
            <input
              id="flightDuration"
              name="flightDuration"
              type="number"
              placeholder="Enter the Duration of the Flight in Hours (example: 3)"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="step-navigation">
          <button disabled={step === 1} onClick={prevStep}>
            Back
          </button>
          <button onClick={handleCreateSubmit}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTourStepThree;
