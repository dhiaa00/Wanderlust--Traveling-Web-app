import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CreateTourStepOne from "./CreateTourStepOne";
import "./createTourForm.css";
import CreateTourStepTwo from "./CreateTourStepTwo";
import axios from "axios";
import FileUploading from "../FileUploading";
import CreateTourStepThree from "./CreateTourStepThree";

const CreateTourMultiStepForm = ({ setCreateTour, setTourCreated }) => {
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const agencyId = window.location.pathname
    .split("agency/")
    .pop()
    .split("/")[0];
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    placeFrom: "",
    placeTo: "",
    price: 0,
    description: "",
    categories: [], // Array to hold selected categories
    visibility: "public",
    thumbImageUrl: "",
    otherImagesUrl: [],
    videoUrl: "",
    startDate: "",
    endDate: "",
    flightTime: "",
    flightDuration: "",
    agencyId: agencyId,
  });
  const handleInputChange = (event, url) => {
    const { name, value } = event.target;
    if (name === "thumbImageUrl" || name === "videoUrl") {
      setFormData({ ...formData, [name]: url });
    } else if (name === "otherImagesUrl") {
      setFormData({ ...formData, [name]: url });
    } else {
      setFormData({ ...formData, [name]: value }); // Update state for specific field
    }
  };

  const handleCheckboxChange = (category) => {
    const updatedCategories = [...formData.categories];
    const categoryIndex = updatedCategories.indexOf(category);
    if (categoryIndex === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(categoryIndex, 1);
    }
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleCreateSubmit = () => {
    try {
      const response = axios.post(
        "http://localhost:8080/offer/create",
        formData
      );
      setTourCreated(true);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setCreateTour(false);
    setIsOpen(false);
  };

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
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            setFileIsUploading={setFileIsUploading}
          />
        ); // Return the JSX for Step 1 content
      case 2:
        return (
          <>
            <CreateTourStepTwo
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
              closeModal={closeModal}
              handleInputChange={handleInputChange}
              setFileIsUploading={setFileIsUploading}
            />
          </>
        );
      case 3:
        return (
          <CreateTourStepThree
            step={step}
            prevStep={prevStep}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
            handleCreateSubmit={handleCreateSubmit}
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
      {fileIsUploading && <FileUploading />}
    </>
  );
};

export default CreateTourMultiStepForm;
