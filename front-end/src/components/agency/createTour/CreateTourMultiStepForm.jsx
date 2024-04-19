import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CreateTourStepOne from "./CreateTourStepOne";
import "./createTourForm.css";
import CreateTourStepTwo from "./CreateTourStepTwo";

const CreateTourMultiStepForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CreateTourStepOne
            step={step}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ); // Return the JSX for Step 1 content
      case 2:
        return (
          <CreateTourStepTwo
            step={step}
            prevStep={prevStep}
            nextStep={nextStep}
            closeModal={closeModal}
          />
        );
    }
  };

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element for react-modal
    openModal();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        {renderStepContent()}
      </Modal>
    </>
  );
};

export default CreateTourMultiStepForm;
